import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UseGuards, Logger } from '@nestjs/common';
import { WsAuthGuard } from '../auth/ws-auth.guard';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { SocketWithUser } from './socket-with-user.type';

export enum Role {
    USER = 'USER',
    PROFESSIONAL = 'PROFESSIONAL',
}

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server!: Server;
    private logger: Logger = new Logger('ChatGateway');

    constructor(private chatService: ChatService) {}

    afterInit(server: Server) {
        this.logger.log('WebSocket server initialized');
    }

    handleConnection(client: SocketWithUser, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: SocketWithUser) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('getMessages')
    @UseGuards(WsAuthGuard)
    async handleGetMessages(client: SocketWithUser, payload: { chatId: string }) {
        const user = client.user;
        const { chatId } = payload;
        this.logger.log(`User ${user.id} requesting messages for chatId: ${chatId}`);
        try {
            const messages = await this.chatService.getMessages(chatId, user.id, user.role as Role);
            client.emit('receiveMessages', messages);
        } catch (error: any) {
            this.logger.error(`Error fetching messages for chatId: ${chatId} - ${error.message}`);
            client.emit('error', error.message);
        }
    }

    @SubscribeMessage('sendMessage')
    @UseGuards(WsAuthGuard)
    async handleMessage(client: SocketWithUser, createChatDto: CreateChatDto) {
        const user = client.user;
        this.logger.log(`User ${user.id} sending message to chatId: ${createChatDto.chatId}`);
        try {
            const message = await this.chatService.createMessage(createChatDto, user);
            this.server.to(createChatDto.chatId).emit('receiveMessage', message);
        } catch (error: any) {
            this.logger.error(`Error sending message: ${error.message}`);
            client.emit('error', error.message);
        }
    }
}