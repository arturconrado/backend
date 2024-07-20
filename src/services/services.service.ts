// services.service.ts
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Role } from '@prisma/client';

@Injectable()
export class ServicesService {
    constructor(private prisma: PrismaService) {}

    async create(createServiceDto: CreateServiceDto, userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (user.role === Role.PROFESSIONAL) {
            throw new ForbiddenException('Professionals cannot create services');
        }

        return this.prisma.service.create({
            data: {
                ...createServiceDto,
                userId: user.id,
            },
        });
    }

    async findAllByUserId(userId: string, role: Role) {
        if (role === Role.PROFESSIONAL) {
            return this.prisma.service.findMany();
        }
        return this.prisma.service.findMany({
            where: { userId },
        });
    }

    async findOne(id: string) {
        return this.prisma.service.findUnique({
            where: { id },
        });
    }

    async update(id: string, updateServiceDto: UpdateServiceDto) {
        return this.prisma.service.update({
            where: { id },
            data: updateServiceDto,
        });
    }

    async remove(id: string) {
        return this.prisma.service.delete({
            where: { id },
        });
    }

    async acceptService(serviceId: string, professionalId: string) {
        return this.prisma.service.update({
            where: { id: serviceId },
            data: { professionalId },
        });
    }
}