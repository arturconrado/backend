import { Injectable } from '@nestjs/common';
import { Job } from '../interfaces/job.interface';
import { ServicesService } from '../services/services.service';

@Injectable()
export class ExpireServicesJob implements Job {
    constructor(private readonly servicesService: ServicesService) {}

    async handle() {
        await this.servicesService.expireServices();
    }
}