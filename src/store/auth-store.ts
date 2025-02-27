import { create } from "zustand";
import { supabase, supabaseClient } from "../lib/supabase";
import { signup } from "@/actions/auth";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface SignupResult {
  message: string;
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
  };
}

interface AuthStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  signup: (formData: FormData) => Promise<SignupResult>;
  signout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: false,
  error: null,
  setUser: (user) => set({ user }),
  signup: async (formData: FormData) => {
    try {
      set({ loading: true, error: null });
      const result = await signup(null, formData);
      return result || { message: "Something went wrong" }; // Ensure we always return an object with message
    } catch (error: any) {
      set({ error: error.message });
      return { message: error.message || "Something went wrong" };
    } finally {
      set({ loading: false });
    }
  },
  signout: async () => {
    await supabaseClient.auth.signOut();
    set({ user: null });
  }
}));