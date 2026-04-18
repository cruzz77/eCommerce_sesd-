/**
 * OOP PRINCIPLE: Encapsulation
 * WHY: Contains all authentication business logic, shielding controllers 
 *      from complexity like password validation and JWT signing.
 */
import jwt from 'jsonwebtoken';
import authRepository from './auth.repository';
import { RegisterDTO, LoginDTO, JwtPayload, UserRole } from '../../types';
import { ApiError } from '../../utils/ApiError';

export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET || 'your_super_secret_jwt_key_min_32_chars';

  async register(dto: RegisterDTO): Promise<any> {
    console.log(`[AUTH] Registration attempt for: ${dto.email}`);
    const existingUser = await authRepository.findByEmail(dto.email);
    if (existingUser) {
      console.log(`[AUTH] Registration failed: Email ${dto.email} already in use`);
      throw new ApiError(400, 'Email already in use');
    }

    try {
      const user = await authRepository.createUser(dto);
      console.log(`[AUTH] Registration successful: ${dto.email}`);
      
      const token = this.generateToken({ userId: user._id.toString(), role: user.role });
      
      return {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token
      };
    } catch (err: any) {
      if (err.code === 11000) {
        throw new ApiError(400, 'This account already exists');
      }
      console.error('[AUTH] Registration logic error:', err);
      throw new ApiError(500, 'Registration failed due to a system error');
    }
  }

  async login(dto: LoginDTO): Promise<{ user: any, token: string }> {
    const user = await authRepository.findByEmail(dto.email);
    if (!user) throw new ApiError(401, 'Invalid credentials');

    const isMatch = await user.comparePassword(dto.password);
    if (!isMatch) throw new ApiError(401, 'Invalid credentials');

    const token = this.generateToken({ userId: user._id.toString(), role: user.role });

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    };
  }

  private generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '7d' });
  }
}

export default new AuthService();
