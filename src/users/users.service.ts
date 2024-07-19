import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../auth/jwt.payload';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}

    async create(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                ...createUserDto,
                password: hashedPassword,
            },
        });
        return user;
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password ?? ''))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload: JwtPayload = { id: user.id, email: user.email };
        return {
            ...user,
            access_token: this.jwtService.sign(payload),
        };
    }

    async findOne(id: string) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async update(id: string, updateUserDto: any) {
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
    }
}