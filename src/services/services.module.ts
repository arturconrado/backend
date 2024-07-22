import { Module, forwardRef } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [ServicesController],
  providers: [ServicesService, PrismaService],
  exports: [ServicesService],
})
export class ServicesModule {}