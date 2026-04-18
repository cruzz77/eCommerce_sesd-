/**
 * OOP PRINCIPLE: Inheritance
 * DESIGN PATTERN: Mongoose Discriminators
 * WHY: AdminUser and CustomerUser inherit from the base User model.
 *      Discriminator key 'role' determines which subclass is instantiated.
 *      Each subclass extends the base with role-specific behaviour.
 */
import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserRole } from '../../types';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IAdminUser extends IUser {
  hasAdminPrivileges(): boolean;
}

export interface ICustomerUser extends IUser {
  getOrderSummary(): string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
  },
  { timestamps: true, discriminatorKey: 'role' }
);

userSchema.pre('save', async function (this: IUser) {
  if (this.isModified('passwordHash')) {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  if (!this.passwordHash) {
    throw new Error('User record corruption: missing password hash');
  }
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

export const User = mongoose.model<IUser>('User', userSchema);

// Subclass: AdminUser — inherits User, adds admin-specific methods
const adminSchema = new Schema<IAdminUser>({});
adminSchema.methods.hasAdminPrivileges = function (): boolean { return this.role === UserRole.ADMIN; };
export const AdminUser = User.discriminator<IAdminUser>('admin', adminSchema);

// Subclass: CustomerUser — inherits User, adds customer-specific methods
const customerSchema = new Schema<ICustomerUser>({});
customerSchema.methods.getOrderSummary = function (): string { return `Customer: ${this.name} <${this.email}>`; };
export const CustomerUser = User.discriminator<ICustomerUser>('user', customerSchema);
