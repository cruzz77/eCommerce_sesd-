/**
 * OOP PRINCIPLE: Abstraction
 * DESIGN PATTERN: Repository Pattern
 * WHY: Centralizes all product-related database queries and stock management logic.
 */
import { Product, IProduct } from './product.model';
import { CreateProductDTO, UpdateProductDTO, ProductQuery } from '../../types';

export class ProductRepository {
  async findAll(query: ProductQuery): Promise<{ items: IProduct[], total: number }> {
    const filter: any = {};
    if (query.category) filter.categoryId = query.category;
    if (query.search) filter.name = { $regex: query.search, $options: 'i' };

    const page = query.page || 1;
    const limit = query.limit || 12;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('categoryId'),
      Product.countDocuments(filter)
    ]);

    return { items, total };
  }

  async findById(id: string): Promise<IProduct | null> {
    return Product.findById(id).populate('categoryId');
  }

  async create(dto: CreateProductDTO): Promise<IProduct> {
    const product = new Product(dto);
    return product.save();
  }

  async update(id: string, dto: UpdateProductDTO): Promise<IProduct | null> {
    return Product.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string): Promise<IProduct | null> {
    return Product.findByIdAndDelete(id);
  }

  async decrementStock(id: string, qty: number): Promise<void> {
    await Product.findByIdAndUpdate(id, { $inc: { stock: -qty } });
  }

  async findLowStock(threshold: number): Promise<IProduct[]> {
    return Product.find({ stock: { $lt: threshold } }).populate('categoryId');
  }
}

export default new ProductRepository();
