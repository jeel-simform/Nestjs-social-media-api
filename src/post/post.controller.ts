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
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('/post')
@ApiTags('Post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiSecurity('JWT-auth')
  @UseGuards(AuthGuard)
  @Post()
  createPost(@Body() createPostDto: CreatePostDto, @Req() request: any) {
    return this.postService.createPost(createPostDto, request.user);
  }

  @Get()
  getAllPost() {
    return this.postService.getAllPost();
  }

  @ApiSecurity('JWT-auth')
  @UseGuards(AuthGuard)
  @Get('my-posts')
  getMyPost(@Req() request: any) {
    return this.postService.getMyPost(request.user);
  }
  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postService.getPostById(+id);
  }

  @ApiSecurity('JWT-auth')
  @UseGuards(AuthGuard)
  @Patch(':id')
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.updatePost(updatePostDto, +id);
  }

  @ApiSecurity('JWT-auth')
  @UseGuards(AuthGuard)
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(+id);
  }
}
