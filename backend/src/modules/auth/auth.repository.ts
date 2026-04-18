/**
 * OOP PRINCIPLE: Abstraction
 * DESIGN PATTERN: Repository Pattern
 * WHY: Isolates all MongoDB query logic for authentication from the service layer.
 */
import { User, IUser } from '../user/user.model';
import { RegisterDTO, UserRole } from '../../types';

export class AuthRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  async createUser(dto: RegisterDTO, role: UserRole = UserRole.USER): Promise<IUser> {
    const user = new User({
      name: dto.name,
      email: dto.email,
      passwordHash: dto.password, // Will be hashed by pre-save hook
      role
    });
    return user.save();
  }
}

export default new AuthRepository();
