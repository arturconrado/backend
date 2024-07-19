import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Professionals')
@Controller('professionals')
export class ProfessionalsController {
    constructor(private readonly professionalsService: ProfessionalsService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new professional' })
    @ApiResponse({ status: 201, description: 'Professional successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    create(@Body() createProfessionalDto: CreateProfessionalDto) {
        return this.professionalsService.create(createProfessionalDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all professionals' })
    @ApiResponse({ status: 200, description: 'Professionals successfully retrieved.' })
    findAll() {
        return this.professionalsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a professional by ID' })
    @ApiResponse({ status: 200, description: 'Professional successfully retrieved.' })
    @ApiResponse({ status: 404, description: 'Professional not found.' })
    findOne(@Param('id') id: string) {
        return this.professionalsService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a professional by ID' })
    @ApiResponse({ status: 200, description: 'Professional successfully updated.' })
    @ApiResponse({ status: 404, description: 'Professional not found.' })
    update(@Param('id') id: string, @Body() updateProfessionalDto: UpdateProfessionalDto) {
        return this.professionalsService.update(+id, updateProfessionalDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a professional by ID' })
    @ApiResponse({ status: 200, description: 'Professional successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Professional not found.' })
    remove(@Param('id') id: string) {
        return this.professionalsService.remove(+id);
    }
}