import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({ example: 'John Doe', description: 'The name of the user', required: false })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ example: 'password123', description: 'The password of the user', required: false })
    @IsString()
    @IsOptional()
    password?: string;

    @ApiProperty({ example: '12.34', description: 'Latitude', required: false })
    @IsNumberString()
    @IsOptional()
    latitude?: string;

    @ApiProperty({ example: '56.78', description: 'Longitude', required: false })
    @IsNumberString()
    @IsOptional()
    longitude?: string;
}