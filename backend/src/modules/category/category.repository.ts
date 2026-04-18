/**
 * OOP PRINCIPLE: Abstraction
 * DESIGN PATTERN: Repository Pattern
 * WHY: Decouples category persistence from the rest of the application.
 */
import { Category, ICategory } from './category.model';

export class CategoryRepository {
  async findAll(): Promise<ICategory[]> {
    return Category.find().sort({ name: 1 });
  }

  async findById(id: string): Promise<ICategory | null> {
    return Category.findById(id);
  }

  async findBySlug(slug: string): Promise<ICategory | null> {
    return Category.findOne({ slug });
  }

  async create(name: string, description: string, slug: string): Promise<ICategory> {
    const category = new Category({ name, description, slug });
    return category.save();
  }

  async delete(id: string): Promise<ICategory | null> {
    return Category.findByIdAndDelete(id);
  }
}

export default new CategoryRepository();
