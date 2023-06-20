import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { Request } from 'express';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }
  @ApiSecurity('JWT-auth')
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() request: any) {
    return this.userService.findById(request.user.id);
  }

  @ApiSecurity('JWT-auth')
  @UseGuards(AuthGuard)
  @Patch('update-me')
  update(@Body() updateUserDto: UpdateUserDto, @Req() request: any) {
    return this.userService.updateProfile(updateUserDto, request.user);
  }

  @ApiSecurity('JWT-auth')
  @UseGuards(AuthGuard)
  @Delete('delete-profile')
  remove(@Req() request: any) {
    return this.userService.deleteUser(request.user);
  }
}
