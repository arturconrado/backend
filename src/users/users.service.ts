import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const data: any = {
            email: createUserDto.email,
            password: hashedPassword,
            role: createUserDto.role,
            latitude: createUserDto.latitude ? parseFloat(createUserDto.latitude) : undefined,
            longitude: createUserDto.longitude ? parseFloat(createUserDto.longitude) : undefined,
        };

        if (createUserDto.name) {
            data.name = createUserDto.name;
        }

        if (createUserDto.role === Role.USER) {
            return this.prisma.user.create({
                data,
            });
        } else if (createUserDto.role === Role.PROFESSIONAL) {
            return this.prisma.professional.create({
                data,
            });
        }
    }

    async findByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (user) return user;

        return this.prisma.professional.findUnique({
            where: { email },
        });
    }

    async findById(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (user) return user;

        return this.prisma.professional.findUnique({
            where: { id },
        });
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        return this.prisma.user.update({
            where: { id },
            data: {
                ...updateUserDto,
                latitude: updateUserDto.latitude ? parseFloat(updateUserDto.latitude) : undefined,
                longitude: updateUserDto.longitude ? parseFloat(updateUserDto.longitude) : undefined,
            },
        });
    }
}