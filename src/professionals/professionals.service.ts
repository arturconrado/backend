import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import {CreateProfessionalDto} from "./dto/create-professional.dto";
import {UpdateProfessionalDto} from "./dto/update-professional.dto";

@Injectable()
export class ProfessionalsService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateProfessionalDto) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.prisma.professional.create({
            data: {
                ...data,
                password: hashedPassword,
            },
        });
    }

    async findAll() {
        return this.prisma.professional.findMany();
    }

    async findOne(id: string) {
        return this.prisma.professional.findUnique({
            where: { id },
        });
    }

    async update(id: string, data: UpdateProfessionalDto) {
        return this.prisma.professional.update({
            where: { id },
            data,
        });
    }

    async remove(id: string) {
        return this.prisma.professional.delete({
            where: { id },
        });
    }
}
