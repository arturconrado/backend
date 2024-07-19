import { Controller, Post, Put, Body, Req, UnauthorizedException, Param } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { auth } from '../firebaseAdminConfig';
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
        const user = await this.usersService.login(loginUserDto.email, loginUserDto.password);
        if (user) {
            const token = await auth.createCustomToken(user.firebaseUid);
            return { token };
        }
        throw new UnauthorizedException('Invalid credentials');
    }

    @Post('verify')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Verify user token' })
    @ApiResponse({ status: 200, description: 'Token successfully verified.' })
    @ApiResponse({ status: 401, description: 'Invalid or no token provided.' })
    async verify(@Req() req: AuthenticatedRequest) {
        const token = req.headers.authorization?.split('Bearer ')[1];
        if (!token) {
            throw new UnauthorizedException('No token provided');
        }
        try {
            const decodedToken = await auth.verifyIdToken(token);
            return { decodedToken };
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
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