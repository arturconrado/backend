import {IsNotEmpty, IsString, IsEnum, IsOptional, IsNumberString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateUserDto {
    @ApiProperty({ example: 'user@example.com', description: 'User email' })
    @IsString()
    @IsNotEmpty()
    email!: string;

    @ApiProperty({ example: 'password123', description: 'User password' })
    @IsString()
    @IsNotEmpty()
    password!: string;

    @ApiProperty({ example: 'USER', description: 'User role' })
    @IsEnum(Role)
    @IsNotEmpty()
    role!: Role;

    @ApiProperty({ example: 'John Doe', description: 'User name' })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ example: 'Developer', description: 'Profession of the professional' })
    @IsString()
    @IsOptional()
    profession?: string;

    @ApiProperty({ example: '12.34', description: 'Latitude' })
    @IsNumberString()
    @IsOptional()
    latitude?: string;

    @ApiProperty({ example: '56.78', description: 'Longitude' })
    @IsNumberString()
    @IsOptional()
    longitude?: string;
}

export class LoginUserDto {
    @ApiProperty({ example: 'user@example.com', description: 'User email' })
    @IsString()
    @IsNotEmpty()
    email!: string;

    @ApiProperty({ example: 'password123', description: 'User password' })
    @IsString()
    @IsNotEmpty()
    password!: string;

    @ApiProperty({ example: 'USER', description: 'User role' })
    @IsEnum(Role)
    @IsOptional()
    role?: Role;

    @ApiProperty({ example: '-34.603684', description: 'Latitude of the user location', required: false })
    @IsString()
    @IsOptional()
    latitude?: string;

    @ApiProperty({ example: '-58.381559', description: 'Longitude of the user location', required: false })
    @IsString()
    @IsOptional()
    longitude?: string;
}