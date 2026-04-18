import { create } from 'zustand';
import { Cart } from '../types';
import cartApi from '../api/cart';

interface CartState {
  cart: Cart | null;
  isOpen: boolean;
  isLoading: boolean;
  toggleDrawer: () => void;
  fetchCart: () => Promise<void>;
  addItem: (productId: string, quantity: number) => Promise<void>;
  updateItem: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  isOpen: false,
  isLoading: false,

  toggleDrawer: () => set({ isOpen: !get().isOpen }),

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const res = await cartApi.getCart();
      set({ cart: res.data.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  addItem: async (productId, quantity) => {
    set({ isLoading: true });
    try {
      const res = await cartApi.addItem({ productId, quantity });
      set({ cart: res.data.data, isLoading: false, isOpen: true });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  updateItem: async (productId, quantity) => {
    set({ isLoading: true });
    try {
      const res = await cartApi.updateItem({ productId, quantity });
      set({ cart: res.data.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  removeItem: async (productId) => {
    set({ isLoading: true });
    try {
      const res = await cartApi.removeItem(productId);
      set({ cart: res.data.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  clearCart: async () => {
    set({ isLoading: true });
    try {
      await cartApi.clearCart();
      set({ cart: null, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));
