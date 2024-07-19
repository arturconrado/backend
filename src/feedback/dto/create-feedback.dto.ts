import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateFeedbackDto {
    @ApiProperty({ example: 5, description: 'The rating of the service', minimum: 1, maximum: 5 })
    @IsInt()
    @Min(1)
    @Max(5)
    rating!: number;

    @ApiProperty({ example: 'Great service!', description: 'The content of the feedback' })
    @IsString()
    comment!: string;

    @ApiProperty({ example: 'user123', description: 'The ID of the user providing the feedback', required: false })
    @IsOptional()
    @IsString()
    userId?: string;

    @ApiProperty({ example: 1, description: 'The ID of the professional associated with the feedback', required: false })
    @IsOptional()
    @IsString()
    professionalId?: string;

    @ApiProperty({ example: 1, description: 'The ID of the service associated with the feedback', required: false })
    @IsOptional()
    @IsInt()
    serviceId?: number;

    @ApiProperty({ example: 'user456', description: 'The ID of the target user for the feedback', required: false })
    @IsOptional()
    @IsString()
    targetUserId?: string;

    @ApiProperty({ example: 2, description: 'The ID of the target professional for the feedback', required: false })
    @IsOptional()
    @IsString()
    targetProfessionalId?: string;
}