import { ApiProperty } from "@nestjs/swagger";


export class PostsCreateDto {

    @ApiProperty({description: 'Заголовок поста', nullable: false})
    readonly heading: string

    @ApiProperty({description: 'Содержимое поста', nullable: true})
    readonly content?: string

    // photos

    // constructor(user: User) {
    //     this.id = user.id
    //     this.email = user.email
    //     this.name = user.name
    //     this.surname = user.surname
    // }
}