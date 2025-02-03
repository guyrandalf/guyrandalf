import { create } from "zustand";
import { signup } from "@/app/actions/auth";
import type { SignupValues } from "@/lib/validations/auth";

interface AuthStore {
  session: Session | null;
  loading: boolean;
  error: string | null;
  signup: (values: SignupValues) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  session: null,
  loading: false,
  error: null,

  signup: async (values: SignupValues) => {
    try {
      set({ loading: true, error: null });
      const result = await signup(values);
      if (result.error) throw new Error(result.error);
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  login: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      set({ session: data.session });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      set({ loading: true, error: null });
      await supabase.auth.signOut();
      set({ session: null });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));
