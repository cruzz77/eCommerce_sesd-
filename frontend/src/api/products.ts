import api from './axios';
import { ApiResponse, Product, PaginatedResponse, Category } from '../types';

export const productsApi = {
  list: (params?: any) => api.get<ApiResponse<PaginatedResponse<Product>>>('/products', { params }),
  getById: (id: string) => api.get<ApiResponse<Product>>(`/products/${id}`),
  listCategories: () => api.get<ApiResponse<Category[]>>('/categories'),
  
  // Admin only
  create: (data: any) => api.post<ApiResponse<Product>>('/products', data),
  update: (id: string, data: any) => api.put<ApiResponse<Product>>(`/products/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse<any>>(`/products/${id}`),
  getLowStock: () => api.get<ApiResponse<Product[]>>('/products/admin/low-stock'),
};

export default productsApi;
