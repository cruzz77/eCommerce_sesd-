/**
 * OOP PRINCIPLE: Abstraction
 * DESIGN PATTERN: Repository Pattern
 * WHY: Isolates user-specific database operations from services.
 */
import { User, IUser } from './user.model';

export class UserRepository {
  async findById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  async findAll(): Promise<IUser[]> {
    return User.find().sort({ createdAt: -1 });
  }

  async deleteById(id: string): Promise<IUser | null> {
    return User.findByIdAndDelete(id);
  }
}

export default new UserRepository();
