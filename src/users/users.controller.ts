import { Controller, Post, Body, Req, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import {CreateUserDto, LoginUserDto} from "./dto/create-user.dto";
import {auth} from "../firebaseAdminConfig";

interface AuthenticatedRequest extends Request {
    user?: any;
}

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        const user = await this.usersService.login(loginUserDto.email, loginUserDto.password);
        if (user) {
            const token = await auth.createCustomToken(user.firebaseUid);
            return { token };
        }
        throw new UnauthorizedException('Invalid credentials');
    }

    @Post('verify')
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
}
