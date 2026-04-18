import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import authApi from '../api/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const res = await authApi.login({ email, password });
          const { user, token } = res.data.data;
          set({ user, token, isLoading: false });
          localStorage.setItem('token', token);
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (name, email, password) => {
        set({ isLoading: true });
        try {
          const res = await authApi.register({ name, email, password });
          const { user, token } = res.data.data;
          set({ user, token, isLoading: false });
          localStorage.setItem('token', token);
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem('token');
      },

      loadUser: async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        set({ isLoading: true, token });
        try {
          const res = await authApi.getMe();
          set({ user: res.data.data, isLoading: false });
        } catch (error) {
          get().logout();
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token }),
    }
  )
);
