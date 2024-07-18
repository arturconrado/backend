import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UnauthorizedException } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}

    @Post()
    create(@Body() createServiceDto: CreateServiceDto, @Req() req: any) {
        if (!req.user || !req.user.uid) {
            throw new UnauthorizedException('User not authenticated');
        }
        return this.servicesService.create(createServiceDto, req.user.uid);
    }

    @Get()
    findAll() {
        return this.servicesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.servicesService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
        return this.servicesService.update(+id, updateServiceDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.servicesService.remove(+id);
    }

    @Post(':id/accept')
    acceptService(@Param('id') id: string, @Body() body: { professionalId: number }) {
        return this.servicesService.acceptService(+id, body.professionalId);
    }
}
