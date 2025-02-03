import { create } from "zustand";
import { signup as signupAction } from "@/app/actions/auth";

interface AuthStore {
  loading: boolean;
  error: string | null;
  signup: (formData: FormData) => Promise<any>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  loading: false,
  error: null,

  signup: async (formData: FormData) => {
    try {
      set({ loading: true, error: null });
      const result = await signupAction(null, formData);
      return result;
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));
