/**
 * OOP PRINCIPLE: Encapsulation
 * WHY: Manages user-specific business logic and admin operations.
 */
import userRepository from './user.repository';
import { ApiError } from '../../utils/ApiError';

export class UserService {
  async getAllUsers() {
    return userRepository.findAll();
  }

  async getUserById(id: string) {
    const user = await userRepository.findById(id);
    if (!user) throw new ApiError(404, 'User not found');
    return user;
  }

  async deleteUser(id: string) {
    const user = await userRepository.deleteById(id);
    if (!user) throw new ApiError(404, 'User not found');
    return user;
  }
}

export default new UserService();
