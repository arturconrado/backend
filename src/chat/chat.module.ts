import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { PrismaModule } from '../prisma/prisma.module';
import {AuthModule} from "../auth/auth.module";
import {ServicesModule} from "../services/services.module";

@Module({
  imports: [PrismaModule, AuthModule, ServicesModule],
  providers: [ChatService, ChatGateway],
  exports: [ChatService],
})
export class ChatModule {}