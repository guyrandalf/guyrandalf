"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sendMessage } from "@/actions/chat";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface Message {
  id: string;
  message: string;
  createdAt: Date;
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export default function ChatComponent({
  initialMessages,
  currentUser,
}: {
  initialMessages: Message[];
  currentUser: { id: string };
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const channel = supabase
      .channel("chat-room")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat",
        },
        async (payload) => {
          console.log("Real-time payload:", payload); // Debug payload
          const newMessage = payload.new as {
            id: string;
            message: string;
            createdAt: string;
            userId: string;
          };

          // Skip if this is the current user's message (handled optimistically)
          if (newMessage.userId === currentUser.id) {
            return;
          }

          // Fetch user details since payload.new doesn’t include relations
          const { data: user, error } = await supabase
            .from("users")
            .select("id, firstName, lastName")
            .eq("id", newMessage.userId)
            .single();

          if (error) {
            console.error("Error fetching user:", error);
            return;
          }

          const formattedMessage: Message = {
            id: newMessage.id,
            message: newMessage.message,
            createdAt: new Date(newMessage.createdAt),
            user: {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
            },
          };

          setMessages((prev) => [...prev, formattedMessage]);
        }
      )
      .subscribe((status) => {
        console.log("Subscription status:", status); // Debug subscription
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUser.id]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsLoading(true);

    const optimisticMessage = {
      id: Math.random().toString(), // Temporary ID
      message: newMessage,
      createdAt: new Date(),
      user: {
        id: currentUser.id,
        firstName: "You",
        lastName: "",
      },
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    setNewMessage("");

    try {
      const result = await sendMessage(currentUser.id, newMessage);

      if (result.error) {
        setMessages((prev) =>
          prev.filter((msg) => msg.id !== optimisticMessage.id)
        );
        toast.error(result.error);
      } else if (result.chat) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === optimisticMessage.id ? result.chat : msg
          )
        );
      }
    } catch (error) {
      setMessages((prev) =>
        prev.filter((msg) => msg.id !== optimisticMessage.id)
      );
      toast.error("Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px]">
      <Card className="flex-1 mb-4 overflow-auto">
        <ScrollArea ref={scrollAreaRef} className="h-full p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.user.id === currentUser.id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    msg.user.id === currentUser.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">
                      {msg.user.id === currentUser.id
                        ? "You"
                        : `${msg.user.firstName} ${msg.user.lastName}`}
                    </span>
                    <span className="text-xs opacity-70">
                      {formatDistanceToNow(new Date(msg.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <p>{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          Send
        </Button>
      </form>
    </div>
  );
}
