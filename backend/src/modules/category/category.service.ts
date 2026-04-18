/**
 * OOP PRINCIPLE: Encapsulation
 * WHY: Manages category lifecycle and automatic slug generation.
 */
import categoryRepository from './category.repository';
import { ApiError } from '../../utils/ApiError';

export class CategoryService {
  async listCategories() {
    return categoryRepository.findAll();
  }

  async createCategory(name: string, description: string) {
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const existing = await categoryRepository.findBySlug(slug);
    if (existing) throw new ApiError(400, 'Category with this name already exists');
    
    return categoryRepository.create(name, description, slug);
  }

  async deleteCategory(id: string) {
    const category = await categoryRepository.delete(id);
    if (!category) throw new ApiError(404, 'Category not found');
    return category;
  }
}

export default new CategoryService();
