import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProfessionalDto {
    @ApiProperty({ example: 'John Doe', description: 'The name of the professional', required: false })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ example: 'Plumbing', description: 'The profession of the professional', required: false })
    @IsString()
    @IsOptional()
    profession?: string;
}