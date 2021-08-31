import {HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./posts.model";
import {UsersService} from "../users/users.service";
import {PostsCreateDto} from "./dto/posts-create.dto";
import {Cloudinary} from "../cloudinary";
import {Op} from "sequelize";

@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) readonly postRepository: typeof Post,
                readonly usersService: UsersService,
                readonly photoService: Cloudinary) {
    }

    async createPost(userId: number, postDto: PostsCreateDto, image=null) {
        const user = await this.usersService.getUserById(userId)
        if (!user) {
            throw new UnauthorizedException('Такого пользователя не существует')
        }
        if (image) {
            const imageName = await this.photoService.uploadImage(image)
            const post = await this.postRepository.create({...postDto, authorId: user.id, photos: imageName})
            return post
        }
        const post = await this.postRepository.create({...postDto, authorId: user.id})
        return post
    }

    async getAllPosts(userId: number=null) {
        let posts = []

        if (userId) {
            const friends = await this.usersService.getUsersFriends(userId)
            for (let i = 0; i < friends.length; i++) {
                let friendsPosts = await this.postRepository.findAll({
                    where: {authorId: friends[i].id}, include: {all: true}, order: [['createdAt', 'DESC']]
                })
                posts = posts.concat(friendsPosts)
            }
            for (let i = 0; i < friends.length; i++) {
                const otherPosts = await this.postRepository.findAll({
                    where: {
                        authorId: {
                            [Op.ne]: friends[i].id
                        }
                    },
                    include: {all: true}, order: [['createdAt', 'DESC']]
                })
                posts = posts.concat(otherPosts)
            }

            posts = posts.concat()
        } else {
            posts = await this.postRepository.findAll({include: {all: true}, order: [['createdAt', 'DESC']]})
        }
        return posts
    }
}
