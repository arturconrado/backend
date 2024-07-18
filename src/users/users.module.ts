import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthMiddleware } from '../middleware/authMiddleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(AuthMiddleware)
        .forRoutes(
            { path: 'users/verify', method: RequestMethod.POST },
            // Adicione outras rotas protegidas aqui, se necessário
        );
  }
}
