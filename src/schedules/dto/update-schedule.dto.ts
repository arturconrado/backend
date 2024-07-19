import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateScheduleDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsDateString()
    date?: string;

    @IsOptional()
    @IsString()
    userId?: string;

    @IsOptional()
    @IsString()
    professionalId?: string;

    @IsOptional()
    @IsString()
    serviceId?: string;
}