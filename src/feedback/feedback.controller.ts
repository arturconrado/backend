import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
    constructor(private readonly feedbackService: FeedbackService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new feedback' })
    @ApiResponse({ status: 201, description: 'Feedback successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    create(@Body() createFeedbackDto: CreateFeedbackDto) {
        return this.feedbackService.create(createFeedbackDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all feedback' })
    @ApiResponse({ status: 200, description: 'Feedback successfully retrieved.' })
    findAll() {
        return this.feedbackService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get feedback by ID' })
    @ApiResponse({ status: 200, description: 'Feedback successfully retrieved.' })
    @ApiResponse({ status: 404, description: 'Feedback not found.' })
    findOne(@Param('id') id: string) {
        return this.feedbackService.findOne(id); // Alterado para string
    }
}