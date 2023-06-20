import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { PasswordService } from './password.service';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { request } from 'http';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { firstName, lastName, email, password } = createUserDto;
    const hashPassword = await this.passwordService.hashPassword(password);
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = hashPassword;
    this.userRepository.save(user);

    const payload = { firstName, lastName, email };
    return {
      token: await this.jwtService.signAsync(payload),
      user,
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOneBy({ email });
    const isMatch = await this.passwordService.comparePassword(
      password,
      user.password,
    );
    if (!user || !isMatch) {
      throw new UnauthorizedException('invalid credentials');
    }
    user.password = undefined;
    return {
      user,
      token: await this.jwtService.signAsync({ user }),
    };
  }

  async updateProfile(updateUserDto: UpdateUserDto, user: any) {
    user.firstName = updateUserDto.firstName || user.firstName;
    user.lastName = updateUserDto.lastName || user.lastName;
    user.email = updateUserDto.email || user.email;
    const updatedUser = await this.userRepository.save(user);
    return updatedUser;
  }
  async findById(id) {
    return await this.userRepository.findOneBy({ id });
  }
  async deleteUser(user: any) {
    return this.userRepository.delete(user.id);
  }
}
