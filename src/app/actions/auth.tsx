"use server";

import { db } from "@/lib/db";
import { signupSchema } from "@/lib/validations/auth";
import { supabase } from "@/lib/supabase";

export async function signup(values: SignupValues) {
  try {
    const validated = signupSchema.parse(values);

    // Create Supabase auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: validated.email,
      password: validated.password,
    });

    if (authError) throw new Error(authError.message);

    // Create user in database
    const user = await db.user.create({
      data: {
        id: authData.user!.id,
        firstName: validated.firstName,
        lastName: validated.lastName,
        email: validated.email,
        password: validated.password, // Note: In production, hash password
      },
    });

    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}
