import { create } from "zustand";
import { supabase, supabaseClient } from "../lib/supabase";
import { signup } from "@/app/actions/auth";

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
}

interface AuthStore {
  user: User | null
  loading: boolean
  error: string | null
  setUser: (user: User | null) => void
  signup: (formData: FormData) => Promise<{ message: string }>;
  signout: () => Promise<void>
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
      return result;
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  signout: async () => {
    await supabaseClient.auth.signOut()
    set({ user: null })
  }
}))
