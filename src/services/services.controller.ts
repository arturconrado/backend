import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}

    @Post()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new service' })
    @ApiResponse({ status: 201, description: 'Service successfully created.' })
    @ApiResponse({ status: 401, description: 'User not authenticated.' })
    create(@Body() createServiceDto: CreateServiceDto, @Req() req: any) {
        return this.servicesService.create(createServiceDto);
    }

    @Get()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all services for the authenticated user' })
    @ApiResponse({ status: 200, description: 'Services successfully retrieved.' })
    @ApiResponse({ status: 401, description: 'User not authenticated.' })
    findAll(@Req() req: any) {
        if (!req.user || !req.user.id) {
            throw new UnauthorizedException('User not authenticated');
        }
        return this.servicesService.findAllByUserId(req.user.id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a service by ID' })
    @ApiResponse({ status: 200, description: 'Service successfully retrieved.' })
    @ApiResponse({ status: 404, description: 'Service not found.' })
    findOne(@Param('id') id: string) {
        return this.servicesService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a service by ID' })
    @ApiResponse({ status: 200, description: 'Service successfully updated.' })
    @ApiResponse({ status: 404, description: 'Service not found.' })
    @ApiResponse({ status: 401, description: 'User not authorized.' })
    async update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto, @Req() req: any) {
        const service = await this.servicesService.findOne(id);
        if (service?.userId !== req.user.id) {
            throw new UnauthorizedException('You can only update your own services');
        }
        return this.servicesService.update(id, updateServiceDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a service by ID' })
    @ApiResponse({ status: 200, description: 'Service successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Service not found.' })
    @ApiResponse({ status: 401, description: 'User not authorized.' })
    async remove(@Param('id') id: string, @Req() req: any) {
        const service = await this.servicesService.findOne(id);
        if (service?.userId !== req.user.id) {
            throw new UnauthorizedException('You can only delete your own services');
        }
        return this.servicesService.remove(id);
    }

    @Post(':id/accept')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Accept a service by ID' })
    @ApiResponse({ status: 200, description: 'Service successfully accepted.' })
    @ApiResponse({ status: 404, description: 'Service not found.' })
    acceptService(@Param('id') id: string, @Body() body: { professionalId: string }) {
        return this.servicesService.acceptService(id, body.professionalId);
    }
}