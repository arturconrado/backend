import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateServiceDto {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsNumber()
    @IsNotEmpty()
    price!: number;

    @IsString()
    @IsNotEmpty()
    userId!: string;

    @IsNumber()
    @IsOptional()
    professionalId?: number;

    @IsDateString()
    @IsNotEmpty()
    date!: string; // Use string para facilitar a manipulação de datas
}
