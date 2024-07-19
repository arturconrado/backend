import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { SchedulesModule } from './schedules/schedules.module';
import { ProfessionalsModule } from './professionals/professionals.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middleware/authMiddleware';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    ServicesModule,
    SchedulesModule,
    ProfessionalsModule,
    AuthModule,
    FeedbackModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(AuthMiddleware)
        .exclude(
            { path: 'users/register', method: RequestMethod.POST }, // Exclui a rota de login
            { path: 'users/login', method: RequestMethod.POST }, // Exclui a rota de criação de usuário
        )
        .forRoutes('*'); // Aplica a todas as outras rotas
  }
}