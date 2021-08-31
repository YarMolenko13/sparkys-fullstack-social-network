import {Body, Controller, Delete, Get, Param, Post, UseGuards} from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { UsersService } from "./users.service";
import {FriendRequestDto} from "./dto/friend-request.dto";

@Controller('api/users')
export class UsersController {

  constructor(private usersService: UsersService) {
  }

  @Get('/')
  @UseGuards(AuthGuard)
  getAllUsers() {
      return this.usersService.getAllUsers()
  }

  @UseGuards(AuthGuard)
  @Delete('/')
  deleteAllUsers() {
    return this.usersService.deleteAllUsers()
  }

  @Get('/friends')
  getAllFriends() {
    return this.usersService.getAllFriends()
  }

  @Get('/friend-reqs/:userId')
  getUsersRequest(@Param('userId') userId: number) {
    return this.usersService.getUsersRequests(userId)
  }

  @Get('/friends/:userId')
  getUsersFriends(@Param('userId') userId: number) {
    return this.usersService.getUsersFriends(userId)
  }


  @Post('/friend')
  sendFriendRequest(@Body() dto: FriendRequestDto) {
    return this.usersService.createUserFriend(dto)
  }

  @Post('/friend/confirm')
  confirmFriend(@Body() dto: FriendRequestDto) {
    return this.usersService.confirmFriend(dto)
  }
}
