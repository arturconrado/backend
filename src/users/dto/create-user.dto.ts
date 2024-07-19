import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
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
    @IsNotEmpty()
    role!: Role;
}