import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Job } from '../interfaces/job.interface';

@Injectable()
export class JobRunnerService {
    private readonly logger = new Logger(JobRunnerService.name);
    private jobs: Job[] = [];

    registerJob(job: Job) {
        this.jobs.push(job);
    }

    @Cron(CronExpression.EVERY_MINUTE)  // Configurar para rodar a cada minuto
    async runJobs() {
        for (const job of this.jobs) {
            try {
                await job.handle();
                this.logger.log(`Successfully ran job: ${job.constructor.name}`);
            } catch (error: any) {
                this.logger.error(`Failed to run job: ${job.constructor.name}`, error.stack);
            }
        }
    }
}