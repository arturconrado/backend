import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Role } from '@prisma/client';
import { addMinutes, parseISO } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';

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

        const dateInUtc = fromZonedTime(createServiceDto.date, 'America/Sao_Paulo');
        const expiresAt = addMinutes(dateInUtc, 20); // Ajuste para 2 minutos

        return this.prisma.service.create({
            data: {
                ...createServiceDto,
                date: dateInUtc.toISOString(), // Certifique-se de armazenar a data em UTC
                userId: user.id,
                expiresAt: expiresAt.toISOString(), // Armazene expiresAt em UTC
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
        // Verificar se o serviço existe
        const service = await this.prisma.service.findUnique({
            where: { id: serviceId },
        });

        if (!service) {
            throw new NotFoundException('Service not found');
        }

        // Verificar se o profissional existe
        const professional = await this.prisma.professional.findUnique({
            where: { id: professionalId },
        });

        if (!professional) {
            throw new NotFoundException('Professional not found');
        }

        // Atualizar o serviço com o ID do profissional
        return this.prisma.service.update({
            where: { id: serviceId },
            data: { professionalId, isActive: true },
        });
    }

    async expireServices() {
        const now = new Date();
        await this.prisma.service.updateMany({
            where: {
                isActive: true,
                expiresAt: {
                    lte: now,
                },
            },
            data: {
                isActive: false,
            },
        });
    }
}