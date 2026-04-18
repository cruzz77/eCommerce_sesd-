import api from './axios';
import { ApiResponse, Cart } from '../types';

export const cartApi = {
  getCart: () => api.get<ApiResponse<Cart>>('/cart'),
  addItem: (data: { productId: string, quantity: number }) => api.post<ApiResponse<Cart>>('/cart/add', data),
  updateItem: (data: { productId: string, quantity: number }) => api.put<ApiResponse<Cart>>('/cart/update', data),
  removeItem: (productId: string) => api.delete<ApiResponse<Cart>>(`/cart/remove/${productId}`),
  clearCart: () => api.delete<ApiResponse<any>>('/cart/clear'),
};

export default cartApi;
