import { create } from "zustand";
import { signup, signin } from "@/app/actions/auth";
import { supabase } from "../lib/supabase";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthStore {
  loading: boolean;
  error: string | null;
  signup: (formData: FormData) => Promise<any>;
  signin: (formData: FormData) => Promise<any>;
  setUser: (user: User | null) => void;
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
      return result;
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  signin: async (formData: FormData) => {
    try {
      set({ loading: true, error: null });
      const result = await signin(null, formData);
      if (result?.user) {
        set({ user: result.user });
      }
      return result;
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  signout: async () => {
    try {
      set({ loading: true });
      await supabase.auth.signOut();
      set({ user: null });
    } catch (error) {
      ({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));
