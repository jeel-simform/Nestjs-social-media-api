import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  [key: string]: any;
}

Object.keys(CreatePostDto.prototype).forEach((key) => {
  ApiProperty()(UpdatePostDto.prototype, key);
});
