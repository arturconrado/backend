import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsDate } from 'class-validator';

export class UpdateScheduleDto {
    @ApiProperty({ example: 'Fix kitchen sink', description: 'The title of the schedule', required: false })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({ example: 'Fix the leaking kitchen sink', description: 'The description of the schedule', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ example: '2023-07-20T14:30:00Z', description: 'The date and time of the schedule', required: false })
    @IsDate()
    @IsOptional()
    date?: Date;

    @ApiProperty({ example: 456, description: 'The ID of the professional assigned to the schedule', required: false })
    @IsNumber()
    @IsOptional()
    professionalId?: number;
}