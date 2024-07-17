import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {CreateScheduleDto} from "./dto/create-schedule.dto";
import {UpdateScheduleDto} from "./dto/update-schedule.dto";

@Injectable()
export class SchedulesService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateScheduleDto) {
        return this.prisma.schedule.create({
            data,
        });
    }

    async findAll() {
        return this.prisma.schedule.findMany({
            include: {
                service: true,
                professional: true,
                user: true,
            },
        });
    }

    async findOne(id: number) {
        return this.prisma.schedule.findUnique({
            where: { id },
            include: {
                service: true,
                professional: true,
                user: true,
            },
        });
    }

    async update(id: number, data: UpdateScheduleDto) {
        return this.prisma.schedule.update({
            where: { id },
            data,
        });
    }

    async remove(id: number) {
        return this.prisma.schedule.delete({
            where: { id },
        });
    }

    async assignProfessional(scheduleId: number, professionalId: number) {
        return this.prisma.schedule.update({
            where: { id: scheduleId },
            data: { professionalId },
        });
    }
}
