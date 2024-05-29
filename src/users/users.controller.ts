import { Controller, Get, Post, Body, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get() // GET /users
    getUser() {

    }

    @Post() // POST /users
    createNewUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }
}
