import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {UpdateServiceDto} from "./dto/update-service.dto";
import {CreateServiceDto} from "./dto/create-service.dto";

@Injectable()
export class ServicesService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateServiceDto) {
        return this.prisma.service.create({
            data,
        });
    }

    async findAll() {
        return this.prisma.service.findMany();
    }

    async findOne(id: number) {
        return this.prisma.service.findUnique({
            where: { id },
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
}
