"use server";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { db } from "@/lib/db";
import { signupSchema, signinSchema } from "@/lib/validations/auth";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

interface State {
  message?: string;
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
  };
}

export async function signup(prevState: any, formData: FormData) {
  try {
    const values = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validated = signupSchema.parse(values);

    // Check if email exists first
    const existingUser = await db.user.findUnique({
      where: { email: validated.email },
    });

    if (existingUser) {
      return {
        message: "This email is already registered",
      };
    }

    const hashedPassword = await bcrypt.hash(validated.password, 10);

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: validated.email,
      password: validated.password,
    });

    if (authError) throw new Error(authError.message);

    if (authData.user) {
      await db.user.create({
        data: {
          id: authData.user.id,
          firstName: validated.firstName,
          lastName: validated.lastName,
          email: validated.email,
          password: hashedPassword,
        },
      });

      revalidatePath("/projects/auth");
      return { message: "Account created successfully!" };
    }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      // P2002 is the error code for unique constraint violations
      if (error.code === "P2002") {
        return {
          message: "This email is already registered",
        };
      }
    }
    return {
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function signin(prevState: State | null, formData: FormData) {
  try {
    if (!formData) {
      throw new Error("Form data is required");
    }

    const rawFormData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validated = signinSchema.safeParse(rawFormData);

    if (!validated.success) {
      return {
        errors: validated.error.flatten().fieldErrors,
      };
    }

    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: validated.data.email,
        password: validated.data.password,
      });

    if (authError) {
      return {
        message: authError.message,
      };
    }

    if (authData.user && authData.session) {
      const user = await db.user.findUnique({
        where: { id: authData.user.id },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      });

      if (!user) {
        return { message: "User not found" };
      }

      // Set cookie session
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: authData.session.access_token,
        refresh_token: authData.session.refresh_token,
      });

      if (sessionError) throw sessionError;

      return {
        message: "Logged in successfully!",
        user,
        session: authData.session,
      };
    }
  } catch (error) {
    console.error("Sign in error:", error);
    return {
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
