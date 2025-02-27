"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

async function validateUser() {
  const supabase = createServerActionClient({ cookies });
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Unauthorized");
  }

  return user;
}

const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

type CreateTodoResult =
  | { message: string; todo: Todo; error?: never }
  | { message?: never; error: string; todo?: never };

interface Todo {
  id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  createdAt: Date;
  userId: string;
}

export async function createTodo(
  userId: string,
  formData: FormData
): Promise<CreateTodoResult> {
  try {
    const validated = todoSchema.parse({
      title: formData.get("title"),
      description: formData.get("description"),
    });

    const todo = await db.todo.create({
      data: {
        ...validated,
        userId,
      },
    });

    revalidatePath("/projects/todo-crud");
    return {
      message: "Todo created successfully",
      todo,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { error: "Failed to create todo" };
  }
}

export async function updateTodo(
  id: string,
  data: { completed?: boolean; title?: string; description?: string }
) {
  try {
    await db.todo.update({
      where: { id },
      data,
    });

    revalidatePath("/projects/todo");
    return { message: "Todo updated successfully" };
  } catch (error) {
    return { error: "Failed to update todo" };
  }
}

export async function deleteTodo(id: string) {
  try {
    await db.todo.delete({
      where: { id },
    });

    revalidatePath("/projects/todo");
    return { message: "Todo deleted successfully" };
  } catch (error) {
    return { error: "Failed to delete todo" };
  }
}
