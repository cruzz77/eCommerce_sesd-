// Enums
export enum UserRole { ADMIN = 'admin', USER = 'user' }
export enum OrderStatus { PENDING = 'pending', PAID = 'paid', SHIPPED = 'shipped', DELIVERED = 'delivered', CANCELLED = 'cancelled' }
export enum PaymentMethod { CREDIT_CARD = 'credit_card', UPI = 'upi', WALLET = 'wallet' }
export enum PaymentStatus { PENDING = 'pending', SUCCESS = 'success', FAILED = 'failed' }

// Auth
export interface RegisterDTO { name: string; email: string; password: string; }
export interface LoginDTO { email: string; password: string; }
export interface JwtPayload { userId: string; role: UserRole; }

// Product
export interface CreateProductDTO {
  name: string; description: string; price: number;
  discountPercent: number; stock: number; categoryId: string; images: string[];
}
export interface UpdateProductDTO extends Partial<CreateProductDTO> {}
export interface ProductQuery { category?: string; search?: string; page?: number; limit?: number; }

// Cart
export interface AddToCartDTO { productId: string; quantity: number; }
export interface UpdateCartDTO { productId: string; quantity: number; }

// Order
export interface CheckoutDTO { shippingAddress: ShippingAddress; }
export interface ShippingAddress { name: string; address: string; city: string; pin: string; }

// Payment
export interface InitiatePaymentDTO { orderId: string; method: PaymentMethod; }

// API
export interface ApiResponseShape<T> { success: boolean; message: string; data?: T; error?: string; }
export interface PaginatedResponse<T> { items: T[]; total: number; page: number; totalPages: number; }

// Express augmentation
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
