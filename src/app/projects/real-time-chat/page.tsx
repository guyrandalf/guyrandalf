import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import ChatComponent from "@/components/chat/chat-component";
import { redirect } from "next/navigation";

export default async function ChatPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/projects/auth");
  }

  const messages = await db.chat.findMany({
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
    take: 50,
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Real-Time Chat</h1>
      <ChatComponent initialMessages={messages} currentUser={user} />
    </div>
  );
}
