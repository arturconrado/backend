import { ApiProperty } from '@nestjs/swagger';
import {IsOptional, IsString, IsNumber, IsBoolean} from 'class-validator';

export class UpdateServiceDto {
    @ApiProperty({ example: 'Plumbing', description: 'The title of the service', required: false })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({ example: 'Fixing leaks in the kitchen', description: 'The description of the service', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ example: 100, description: 'The price of the service', required: false })
    @IsNumber()
    @IsOptional()
    price?: number;

    @ApiProperty({ example: 'user123', description: 'The ID of the user requesting the service', required: false })
    @IsString()
    @IsOptional()
    userId?: string;

    @ApiProperty({ example: 456, description: 'The ID of the professional assigned to the service', required: false })
    @IsString()
    @IsOptional()
    professionalId?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}