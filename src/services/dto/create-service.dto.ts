import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
    @ApiProperty({ example: 'Plumbing', description: 'The title of the service' })
    @IsString()
    @IsNotEmpty()
    title!: string;

    @ApiProperty({ example: 'Fixing leaks in the kitchen', description: 'The description of the service' })
    @IsString()
    @IsNotEmpty()
    description!: string;

    @ApiProperty({ example: 100, description: 'The price of the service' })
    @IsNumber()
    @IsNotEmpty()
    price!: number;

    @ApiProperty({ example: 'user123', description: 'The ID of the user requesting the service' })
    @IsString()
    @IsNotEmpty()
    userId!: string;

    @ApiProperty({ example: 456, description: 'The ID of the professional assigned to the service', required: false })
    @IsNumber()
    @IsOptional()
    professionalId?: number;

    @ApiProperty({ example: '2023-07-20T14:30:00Z', description: 'The date and time of the service' })
    @IsDateString()
    @IsNotEmpty()
    date!: string; // Use string para facilitar a manipulação de datas
}