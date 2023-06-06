import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  [key: string]: any;
}

Object.keys(CreateUserDto.prototype).forEach((key) => {
  ApiProperty()(UpdateUserDto.prototype, key);
});
