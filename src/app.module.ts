import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { SchedulesModule } from './schedules/schedules.module';
import { ProfessionalsModule } from './professionals/professionals.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    ServicesModule,
    SchedulesModule,
    ProfessionalsModule,
  ],
})
export class AppModule {}
