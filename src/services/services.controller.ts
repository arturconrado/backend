import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UnauthorizedException } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}

    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new service' })
    @ApiResponse({ status: 201, description: 'Service successfully created.' })
    @ApiResponse({ status: 401, description: 'User not authenticated.' })
    create(@Body() createServiceDto: CreateServiceDto, @Req() req: any) {
        if (!req.user || !req.user.uid) {
            throw new UnauthorizedException('User not authenticated');
        }
        return this.servicesService.create(createServiceDto, req.user.uid);
    }

    @Get()
    @ApiOperation({ summary: 'Get all services' })
    @ApiResponse({ status: 200, description: 'Services successfully retrieved.' })
    findAll() {
        return this.servicesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a service by ID' })
    @ApiResponse({ status: 200, description: 'Service successfully retrieved.' })
    @ApiResponse({ status: 404, description: 'Service not found.' })
    findOne(@Param('id') id: string) {
        return this.servicesService.findOne(+id);
    }

    @Patch(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a service by ID' })
    @ApiResponse({ status: 200, description: 'Service successfully updated.' })
    @ApiResponse({ status: 404, description: 'Service not found.' })
    update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
        return this.servicesService.update(+id, updateServiceDto);
    }

    @Delete(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a service by ID' })
    @ApiResponse({ status: 200, description: 'Service successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Service not found.' })
    remove(@Param('id') id: string) {
        return this.servicesService.remove(+id);
    }

    @Post(':id/accept')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Accept a service by ID' })
    @ApiResponse({ status: 200, description: 'Service successfully accepted.' })
    @ApiResponse({ status: 404, description: 'Service not found.' })
    acceptService(@Param('id') id: string, @Body() body: { professionalId: number }) {
        return this.servicesService.acceptService(+id, body.professionalId);
    }
}