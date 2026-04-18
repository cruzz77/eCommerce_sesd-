import api from './axios';
import { ApiResponse, Order, OrderStatus } from '../types';

export const ordersApi = {
  checkout: (data: any) => api.post<ApiResponse<Order>>('/orders/checkout', data),
  getMyOrders: () => api.get<ApiResponse<Order[]>>('/orders'),
  getById: (id: string) => api.get<ApiResponse<Order>>(`/orders/${id}`),
  
  // Admin only
  getAllOrders: () => api.get<ApiResponse<Order[]>>('/orders/admin/all'),
  updateStatus: (id: string, status: OrderStatus) => api.patch<ApiResponse<Order>>(`/orders/${id}/status`, { status }),
};

export default ordersApi;
