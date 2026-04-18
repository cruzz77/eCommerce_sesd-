/**
 * OOP PRINCIPLE: Encapsulation
 * WHY: Orchestrates product-related operations, including inventory 
 *      tracking and advanced filtering.
 */
import productRepository from './product.repository';
import { CreateProductDTO, UpdateProductDTO, ProductQuery } from '../../types';
import { ApiError } from '../../utils/ApiError';

export class ProductService {
  async listProducts(query: ProductQuery) {
    return productRepository.findAll(query);
  }

  async getProduct(id: string) {
    const product = await productRepository.findById(id);
    if (!product) throw new ApiError(404, 'Product not found');
    return product;
  }

  async createProduct(dto: CreateProductDTO) {
    return productRepository.create(dto);
  }

  async updateProduct(id: string, dto: UpdateProductDTO) {
    const product = await productRepository.update(id, dto);
    if (!product) throw new ApiError(404, 'Product not found');
    return product;
  }

  async deleteProduct(id: string) {
    const product = await productRepository.delete(id);
    if (!product) throw new ApiError(404, 'Product not found');
    return product;
  }

  async getLowStockProducts(threshold = 10) {
    return productRepository.findLowStock(threshold);
  }
}

export default new ProductService();
