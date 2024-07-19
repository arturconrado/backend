import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
    email!: string;

    @ApiProperty({ example: 'password123', description: 'The password of the user' })
    password!: string;

    @ApiProperty({ example: 'John Doe', description: 'The name of the user', required: false })
    name?: string;
}

export class LoginUserDto {
    @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
    email!: string;

    @ApiProperty({ example: 'password123', description: 'The password of the user' })
    password!: string;
}