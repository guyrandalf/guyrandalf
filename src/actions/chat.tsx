"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface ChatMessage {
  id: string;
  message: string;
  createdAt: Date;
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

type SendMessageResult =
  | { message: string; chat: ChatMessage; error?: never }
  | { message?: never; error: string; chat?: never };

export async function sendMessage(
  userId: string,
  message: string
): Promise<SendMessageResult> {
  try {
    const chat = await db.chat.create({
      data: {
        message,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    const formattedChat: ChatMessage = {
      id: chat.id,
      message: chat.message,
      createdAt: chat.createdAt,
      user: {
        id: chat.user.id,
        firstName: chat.user.firstName,
        lastName: chat.user.lastName,
      },
    };

    revalidatePath("/projects/chat");
    return { message: "Message sent", chat: formattedChat };
  } catch (error) {
    console.error("Send message error:", error);
    return { error: "Failed to send message" };
  }
}
