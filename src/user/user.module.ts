import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from 'src/guard/auth.guard';
import { User } from './entities/user.entity';
import { PasswordService } from './password.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, PasswordService, AuthGuard],
  exports: [UserService, PasswordService],
})
export class UserModule {}
