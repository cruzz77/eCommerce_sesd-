export enum UserRole { ADMIN = 'admin', USER = 'user' }
export enum OrderStatus { PENDING = 'pending', PAID = 'paid', SHIPPED = 'shipped', DELIVERED = 'delivered', CANCELLED = 'cancelled' }
export enum PaymentMethod { CREDIT_CARD = 'credit_card', UPI = 'upi', WALLET = 'wallet' }
export enum PaymentStatus { PENDING = 'pending', SUCCESS = 'success', FAILED = 'failed' }

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Category {
  _id: string;
  name: string;
  description: string;
  slug: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPercent: number;
  stock: number;
  categoryId: Category | string;
  images: string[];
  createdAt: string;
}

export interface CartItem {
  productId: Product;
  quantity: number;
  priceSnapshot: number;
}

export interface Cart {
  userId: string;
  items: CartItem[];
  totalAmount?: number; // Calculated on frontend or returned from backend
}

export interface Order {
  _id: string;
  userId: string | User;
  items: Array<{
    productId: string | Product;
    name: string;
    qty: number;
    price: number;
  }>;
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    pin: string;
  };
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
}
