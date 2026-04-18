import api from './axios';
import { ApiResponse, Product } from '../types';

export const aiApi = {
  recommend: (query: string) => api.post<ApiResponse<Product[]>>('/ai/recommend', { query }),
};

export default aiApi;
