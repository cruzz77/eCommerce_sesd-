import mongoose, { Schema, Document } from 'mongoose';

/**
 * OOP PRINCIPLE: Abstraction
 * WHY: Defines the structure for product categories, isolating naming and slugs 
 *      from the core product logic.
 */
export interface ICategory extends Document {
  name: string; 
  description: string; 
  slug: string;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  slug: { type: String, required: true, unique: true, lowercase: true },
}, { timestamps: true });

export const Category = mongoose.model<ICategory>('Category', categorySchema);
