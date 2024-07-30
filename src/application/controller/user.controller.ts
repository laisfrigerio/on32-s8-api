import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../../domain/service/user.service';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(
    @Body()
    createUserDto: CreateUserDto,
  ) {
    try {
      return this.userService.createUser(
        createUserDto.name,
        createUserDto.email,
        createUserDto.password,
        createUserDto.cpf,
        createUserDto.zipCode,
      );
    } catch (error) {
      throw new BadRequestException({ error: error.message });
    }
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    try {
      return this.userService.getUserById(id);
    } catch (error) {
      throw new NotFoundException({ error: error.message });
    }
  }

  @Get()
  async listUsers() {
    return await this.userService.listUsers();
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.userService.updateUser(
        id,
        updateUserDto.name,
        updateUserDto.email,
        updateUserDto.password,
        updateUserDto.cpf,
      );
    } catch (error) {
      throw new BadRequestException({ error: error.message });
    }
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
