import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { SchedulesModule } from './schedules/schedules.module';
import { ProfessionalsModule } from './professionals/professionals.module';
import { AuthModule } from './auth/auth.module';
import {AuthMiddleware} from "./middleware/authMiddleware";

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    ServicesModule,
    SchedulesModule,
    ProfessionalsModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(AuthMiddleware)
        .forRoutes('*'); // Aplica o middleware a todas as rotas. Você pode especificar rotas específicas se necessário
  }
}
