import { Injectable, OnModuleInit, INestApplication, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super();
    }

    async onModuleInit(): Promise<void> {
        await this.$connect();
    }

    async onModuleDestroy(): Promise<void> {
        await this.$disconnect();
    }

    async enableShutdownHooks(app: INestApplication): Promise<void> {
        // @ts-ignore
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
}
