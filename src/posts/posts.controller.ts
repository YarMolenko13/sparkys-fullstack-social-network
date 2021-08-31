import {Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {PostsService} from "./posts.service";
import {PostsCreateDto} from "./dto/posts-create.dto";
import {AuthGuard} from "../auth/auth.guard";
import {ApiResponse} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";


@Controller('api/posts')
export class PostsController {

    constructor(private postsService: PostsService) {
    }

    @ApiResponse({status: 200, type: Post})
    @ApiResponse({status: 401, description: 'Такого пользователя не существует'})
    @ApiResponse({status: 422, description: 'Ошибка валидации тела запроса'})
    @UseGuards(AuthGuard)
    @Post('/no-photo/:userId')
    createPostNoPhoto(@Param('userId') userId: number,
               @Body() postDto: PostsCreateDto) {
        return this.postsService.createPost(userId, postDto)
    }

    @ApiResponse({status: 200, type: Post})
    @ApiResponse({status: 401, description: 'Такого пользователя не существует'})
    @ApiResponse({status: 422, description: 'Ошибка валидации тела запроса'})
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    @Post('/:userId')
    createPost(@Param('userId') userId: number,
               @UploadedFile() image,
               @Body() postDto: PostsCreateDto) {
        return this.postsService.createPost(userId, postDto, image)
    }

    @ApiResponse({status: 200, type: [Post]})
    @Get('/')
    getAllPosts() {
        return this.postsService.getAllPosts()
    }

    @ApiResponse({status: 200, type: [Post]})
    @Get('/:userId')
    getPostsForUser(@Param('userId') userId: number) {
        return this.postsService.getAllPosts(userId)
    }
}
