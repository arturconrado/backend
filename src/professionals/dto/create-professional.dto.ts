import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProfessionalDto {
    @ApiProperty({ example: 'John Doe', description: 'The name of the professional' })
    @IsNotEmpty()
    @IsString()
    name!: string;

    @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the professional' })
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @ApiProperty({ example: 'password123', description: 'The password of the professional' })
    @IsNotEmpty()
    @IsString()
    password!: string;

    @ApiProperty({ example: 'Plumbing', description: 'The profession of the professional' })
    @IsNotEmpty()
    @IsString()
    profession!: string;

    @ApiProperty({ example: 37.7749, description: 'The latitude of the professional location', required: false })
    @IsOptional()
    @IsNumber()
    latitude?: number;

    @ApiProperty({ example: -122.4194, description: 'The longitude of the professional location', required: false })
    @IsOptional()
    @IsNumber()
    longitude?: number;
}