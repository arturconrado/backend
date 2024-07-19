import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';

export class CreateScheduleDto {
    @ApiProperty({ example: 'Fix kitchen sink', description: 'The title of the schedule' })
    @IsString()
    @IsNotEmpty()
    title!: string;

    @ApiProperty({ example: 'Fix the leaking kitchen sink', description: 'The description of the schedule' })
    @IsString()
    @IsNotEmpty()
    description!: string;

    @ApiProperty({ example: '2023-07-20T14:30:00Z', description: 'The date and time of the schedule' })
    @IsDate()
    @IsNotEmpty()
    date!: Date;

    @ApiProperty({ example: 'user123', description: 'The ID of the user requesting the schedule' })
    @IsString()
    @IsNotEmpty()
    userId!: string;

    @ApiProperty({ example: 1, description: 'The ID of the service associated with the schedule' })
    @IsString()
    @IsNotEmpty()
    serviceId!: string;

    @ApiProperty({ example: 456, description: 'The ID of the professional assigned to the schedule', required: false })
    @IsString()
    @IsOptional()
    professionalId?: string;
}