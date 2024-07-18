import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { auth } from '../firebaseAdminConfig';

@Injectable()
export class ServicesService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateServiceDto, userId: string) {
        console.log('CreateServiceDto:', data);  // Log do payload recebido

        // Verificar se o usuário existe no Firebase
        const userRecord = await auth.getUser(userId);
        if (!userRecord) {
            throw new NotFoundException('User not found in Firebase');
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
            user: {
                connectOrCreate: {
                    where: { firebaseUid: userRecord.uid },
                    create: {
                        firebaseUid: userRecord.uid,
                        email: userRecord.email,
                    },
                },
            },
            schedules: {
                create: {
                    title: data.title,
                    description: data.description,
                    date: new Date(data.date),
                    user: {
                        connectOrCreate: {
                            where: { firebaseUid: userRecord.uid },
                            create: {
                                firebaseUid: userRecord.uid,
                                email: userRecord.email,
                            },
                        },
                    },
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

    async findAll() {
        return this.prisma.service.findMany({
            include: {
                schedules: true,
                user: true,
                professional: true,
            },
        });
    }

    async findOne(id: number) {
        return this.prisma.service.findUnique({
            where: { id },
            include: {
                schedules: true,
                user: true,
                professional: true,
            },
        });
    }

    async update(id: number, data: UpdateServiceDto) {
        return this.prisma.service.update({
            where: { id },
            data,
        });
    }

    async remove(id: number) {
        return this.prisma.service.delete({
            where: { id },
        });
    }

    async acceptService(serviceId: number, professionalId: number) {
        // Verificar se o profissional existe
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
