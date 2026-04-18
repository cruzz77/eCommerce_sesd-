import api from './axios';
import { ApiResponse, PaymentMethod } from '../types';

export const paymentsApi = {
  initiate: (data: { orderId: string, method: PaymentMethod }) => api.post<ApiResponse<any>>('/payments/initiate', data),
  getByOrder: (orderId: string) => api.get<ApiResponse<any>>(`/payments/${orderId}`),
};

export default paymentsApi;
