import {IsString, IsNotEmpty, IsEnum, IsOptional} from 'class-validator';
import { Role } from '@prisma/client';

export class CreateChatDto {
    @IsString()
    @IsNotEmpty()
    chatId!: string;

    @IsString()
    @IsNotEmpty()
    senderUserId!: string;

    @IsString()
    @IsOptional()
    senderProfissionalId?: string;

    @IsEnum(Role)
    senderRole!: Role;

    @IsString()
    @IsNotEmpty()
    message!: string;

    @IsString()
    @IsNotEmpty()
    serviceId!: string;
}