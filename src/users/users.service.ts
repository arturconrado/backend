import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import {CreateUserDto} from "./dto/create-user.dto";
import {auth} from "../firebaseAdminConfig";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const firebaseUser = await auth.createUser({
            email: data.email,
            password: data.password,
        });
        return this.prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
                firebaseUid: firebaseUser.uid,
            },
        });
    }

    async findAll() {
        return this.prisma.user.findMany();
    }

    async findOne(id: number) {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }

    async update(id: number, data: UpdateUserDto) {
        return this.prisma.user.update({
            where: { id },
            data,
        });
    }

    async remove(id: number) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (user) {
            await auth.deleteUser(user.firebaseUid);
        }
        return this.prisma.user.delete({
            where: { id },
        });
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        throw new UnauthorizedException('Invalid credentials');
    }
}
