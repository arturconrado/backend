import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
    constructor(private prisma: PrismaService) {}

    async create(createServiceDto: CreateServiceDto, userId: string) {
        return this.prisma.service.create({
            data: {
                ...createServiceDto,
                userId, // Adiciona o userId aqui
            },
        });
    }

    async findAllByUserId(userId: string) {
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