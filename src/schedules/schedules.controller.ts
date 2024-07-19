import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Schedules')
@Controller('schedules')
export class SchedulesController {
    constructor(private readonly schedulesService: SchedulesService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new schedule' })
    @ApiResponse({ status: 201, description: 'Schedule successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    create(@Body() createScheduleDto: CreateScheduleDto) {
        return this.schedulesService.create(createScheduleDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all schedules' })
    @ApiResponse({ status: 200, description: 'Schedules successfully retrieved.' })
    findAll() {
        return this.schedulesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a schedule by ID' })
    @ApiResponse({ status: 200, description: 'Schedule successfully retrieved.' })
    @ApiResponse({ status: 404, description: 'Schedule not found.' })
    findOne(@Param('id') id: string) {
        return this.schedulesService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a schedule by ID' })
    @ApiResponse({ status: 200, description: 'Schedule successfully updated.' })
    @ApiResponse({ status: 404, description: 'Schedule not found.' })
    update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto) {
        return this.schedulesService.update(id, updateScheduleDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a schedule by ID' })
    @ApiResponse({ status: 200, description: 'Schedule successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Schedule not found.' })
    remove(@Param('id') id: string) {
        return this.schedulesService.remove(id);
    }

    @Patch(':id/assign')
    @ApiOperation({ summary: 'Assign a professional to a schedule' })
    @ApiResponse({ status: 200, description: 'Professional successfully assigned.' })
    @ApiResponse({ status: 404, description: 'Schedule or Professional not found.' })
    assignProfessional(@Param('id') id: string, @Body('professionalId') professionalId: string) {
        return this.schedulesService.assignProfessional(id, professionalId);
    }
}