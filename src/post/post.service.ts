// import { Post } from "@nestjs/common";
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async createPost(createPostDto: CreatePostDto, user: any) {
    const { title, description, location } = createPostDto;
    const post = new Post();
    post.title = title;
    post.description = description;
    post.location = location;
    post.user = user;
    return await this.postRepository.save(post);
  }
  async getAllPost() {
    return await this.postRepository.find();
  }
  async getMyPost(user: any) {
    const userId = user.id;
    return await this.postRepository
      .createQueryBuilder('post')
      .where('post.user = :userId', { userId })
      .getMany();
  }
  async getPostById(id: number) {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new BadRequestException('Invalid post id');
    }
    return post;
  }

  async updatePost(updatePostDto: UpdatePostDto, id: number) {
    const post = await this.getPostById(id);
    post.title = updatePostDto.title;
    post.description = updatePostDto.description;
    post.location = updatePostDto.location;

    return this.postRepository.save(post);
  }
  async deletePost(id: number) {
    await this.postRepository.delete(id);
    return 'Post deleted successfully';
  }
}
