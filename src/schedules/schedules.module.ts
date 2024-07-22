import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';  // Importar ScheduleModule
import { ServicesModule } from '../services/services.module';
import {ExpireServicesJob} from "../jobs/expire-services.job";
import {JobRunnerService} from "../services/job-runner.service";  // Importar ServicesModule

@Module({
  imports: [
    PrismaModule,
    ScheduleModule.forRoot(),  // Importar ScheduleModule
    ServicesModule,  // Importar ServicesModule
  ],
  controllers: [SchedulesController],
  providers: [
    SchedulesService,
    JobRunnerService,  // Prover JobRunnerService
    ExpireServicesJob,  // Prover ExpireServicesJob
  ],
})
export class SchedulesModule {
  constructor(
      private readonly jobRunnerService: JobRunnerService,
      private readonly expireServicesJob: ExpireServicesJob,
  ) {
    // Registra os jobs no JobRunnerService
    this.jobRunnerService.registerJob(this.expireServicesJob);
  }
}