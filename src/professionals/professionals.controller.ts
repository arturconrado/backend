import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Professionals')
@Controller('professionals')
export class ProfessionalsController {
    constructor(private readonly professionalsService: ProfessionalsService) {}

    @Get(':id')
    @ApiOperation({ summary: 'Get a professional by ID' })
    @ApiResponse({ status: 200, description: 'Professional successfully retrieved.' })
    @ApiResponse({ status: 404, description: 'Professional not found.' })
    findOne(@Param('id') id: string) {
        return this.professionalsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a professional by ID' })
    @ApiResponse({ status: 200, description: 'Professional successfully updated.' })
    @ApiResponse({ status: 404, description: 'Professional not found.' })
    update(@Param('id') id: string, @Body() updateProfessionalDto: UpdateProfessionalDto) {
        return this.professionalsService.update(id, updateProfessionalDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a professional by ID' })
    @ApiResponse({ status: 200, description: 'Professional successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Professional not found.' })
    remove(@Param('id') id: string) {
        return this.professionalsService.remove(id);
    }
}