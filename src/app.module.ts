import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { SchedulesModule } from './schedules/schedules.module';
import { ProfessionalsModule } from './professionals/professionals.module';
import { AuthModule } from './auth/auth.module';
import { FeedbackModule } from './feedback/feedback.module';
import { AuthMiddleware } from './middleware/authMiddleware';
import { ChatModule } from './chat/chat.module';

@Module({
    imports: [
        PrismaModule,
        UsersModule,
        ServicesModule,
        SchedulesModule,  // Certifique-se de importar o SchedulesModule
        ProfessionalsModule,
        AuthModule,
        FeedbackModule,
        ChatModule,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .exclude(
                { path: 'users/register', method: RequestMethod.POST },
                { path: 'users/login', method: RequestMethod.POST },
            )
            .forRoutes('*');
    }
}