import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { auth } from '../firebaseAdminConfig';

@Injectable()
export class ServicesService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateServiceDto) {
        const userId = data.userId; // Pega o userId do payload

        // Verificar se o usuário existe no Firebase
        const userRecord = await auth.getUser(userId);
        if (!userRecord) {
            throw new NotFoundException('User not found in Firebase');
        }

        // Verificar se o usuário existe no banco de dados do Prisma
        const userExists = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!userExists) {
            throw new NotFoundException('User not found in Prisma');
        }

        // Verificar se o profissional existe (se fornecido)
        if (data.professionalId) {
            const professional = await this.prisma.professional.findUnique({
                where: { id: data.professionalId },
            });

            if (!professional) {
                throw new NotFoundException('Professional not found');
            }
        }

        const serviceData: any = {
            title: data.title,
            description: data.description,
            price: data.price,
            userId: userExists.id, // Associa o userId corretamente ao serviço
            schedules: {
                create: {
                    title: data.title,
                    description: data.description,
                    date: new Date(data.date),
                    userId: userExists.id, // Associa o userId corretamente ao agendamento
                },
            },
        };

        if (data.professionalId) {
            serviceData.professional = {
                connect: { id: data.professionalId },
            };
            serviceData.schedules.create.professional = {
                connect: { id: data.professionalId },
            };
        }

        return this.prisma.service.create({
            data: serviceData,
            include: {
                schedules: true,
            },
        });
    }

    async findAllByUserId(userId: string) {
        const userExists = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!userExists) {
            throw new NotFoundException('User not found in Prisma');
        }

        return this.prisma.service.findMany({
            where: { userId: userExists.id },
            include: {
                schedules: true,
                user: true,
                professional: true,
            },
        });
    }

    async findOne(id: string) {
        return this.prisma.service.findUnique({
            where: { id },
            include: {
                schedules: true,
                user: true,
                professional: true,
            },
        });
    }

    async update(id: string, data: UpdateServiceDto) {
        return this.prisma.service.update({
            where: { id },
            data,
        });
    }

    async remove(id: string) {
        return this.prisma.service.delete({
            where: { id },
        });
    }

    async acceptService(serviceId: string, professionalId: string) {
        const professional = await this.prisma.professional.findUnique({
            where: { id: professionalId },
        });

        if (!professional) {
            throw new NotFoundException('Professional not found');
        }

        return this.prisma.service.update({
            where: { id: serviceId },
            data: {
                professional: {
                    connect: { id: professionalId },
                },
            },
        });
    }
}