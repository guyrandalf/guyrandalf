"use server";

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

export async function signup(prevState: State, formData: FormData) {
  try {
    if (!formData) {
      throw new Error("Form data is required");
    }

    const rawFormData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validated = signupSchema.safeParse(rawFormData);

    if (!validated.success) {
      return {
        errors: validated.error.flatten().fieldErrors,
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validated.data.password, 10);

    // Create Supabase auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: validated.data.email,
      password: validated.data.password,
    });

    if (authError) {
      return {
        message: authError.message,
      };
    }

    if (authData.user) {
      // Create user in database with hashed password
      await db.user.create({
        data: {
          id: authData.user.id,
          firstName: validated.data.firstName,
          lastName: validated.data.lastName,
          email: validated.data.email,
          password: hashedPassword, // Store hashed password
        },
      });

      revalidatePath("/projects/auth");
      return { message: "Account created successfully!" };
    }
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

export async function signin(prevState: State, formData: FormData) {
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

    // Login to get auth user
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

    if (authData.user) {
      // Create user in database with hashed password
      const user = await db.user.findUnique({
        where: { id: authData.user.id },
      });

      if (!user) {
        return {
          message: "User not found",
        };
      }

      revalidatePath("/projects/auth");
      return {
        message: "Logged in successfully!",
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      };
    }
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
