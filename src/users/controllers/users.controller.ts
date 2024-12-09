import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ResponseUserDto } from '../dtos/response-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiGetAllUsers } from '../swagger-dacorator/get-all-users-decorators';
import { ApiGetUser } from '../swagger-dacorator/get-user-decorators';
import { ApiUpdateUser } from '../swagger-dacorator/patch-user-decorators';
import { ApiDeleteUser } from '../swagger-dacorator/delete-user-decorators';
import { PositiveIntPipe } from 'src/common/pipes/positive-int/positive-int.pipe';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiGetAllUsers()
  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @ApiGetUser()
  @Get(':id')
  async getUser(@Param('id', PositiveIntPipe) userId: number) {
    return this.usersService.getUser(userId);
  }

  @ApiUpdateUser()
  @Patch(':id')
  async updateUser(
    @Param('id', PositiveIntPipe) userId: number,
    @Body() updateUserData: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    return this.usersService.updateUser(userId, updateUserData);
  }

  @ApiDeleteUser()
  @Delete(':id')
  async remove(@Param('id', PositiveIntPipe) userId: number) {
    await this.usersService.deleteUser(userId);
    return { statusCode: 204, message: 'No Content' };
  }

  @Get(':id/token')
  async getUserToken(@Param('id', PositiveIntPipe) userId: number) {
    return this.usersService.getUserToken(userId);
  }
}
