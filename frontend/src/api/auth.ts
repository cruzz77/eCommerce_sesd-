import api from './axios';
import { ApiResponse, User } from '../types';

export const authApi = {
  register: (data: any) => api.post<ApiResponse<{ user: User, token: string }>>('/auth/register', data),
  login: (data: any) => api.post<ApiResponse<{ user: User, token: string }>>('/auth/login', data),
  getMe: () => api.get<ApiResponse<User>>('/auth/me'),
};

export default authApi;
