import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { User } from '../types';

type UserStore = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  loadSession: () => Promise<void>;
};

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
  loadSession: async () => {
    set({ isLoading: true });
    try {
      const userJson = await SecureStore.getItemAsync('user');
      if (userJson) {
        const user = JSON.parse(userJson);
        set({ user, isAuthenticated: true });
      }
    } catch (error) {
      console.error('Erro ao carregar sessão:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
