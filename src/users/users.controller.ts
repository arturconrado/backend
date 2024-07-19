import { Controller, Post, Put, Body, Req, UnauthorizedException, Param } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

interface AuthenticatedRequest extends Request {
    user?: any;
}

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User successfully registered.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    async register(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Login a user' })
    @ApiResponse({ status: 200, description: 'User successfully logged in.' })
    @ApiResponse({ status: 401, description: 'Invalid credentials.' })
    async login(@Body() loginUserDto: LoginUserDto) {
        return this.usersService.login(loginUserDto.email, loginUserDto.password);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a user' })
    @ApiResponse({ status: 200, description: 'User successfully updated.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
}