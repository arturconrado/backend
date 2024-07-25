import { Injectable, NotFoundException, ForbiddenException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChatDto } from './dto/create-chat.dto';

export enum Role {
    USER = 'USER',
    PROFESSIONAL = 'PROFESSIONAL',
}

@Injectable()
export class ChatService {
    private readonly logger = new Logger(ChatService.name);

    constructor(private prisma: PrismaService) {}

    async getMessages(chatId: string, userId: string, role: Role) {
        this.logger.log(`Fetching messages for chatId: ${chatId} by userId: ${userId} with role: ${role}`);

        const service = await this.prisma.service.findFirst({
            where: {
                id: chatId,
                OR: [
                    { userId: role === Role.USER ? userId : undefined },
                    { professionalId: role === Role.PROFESSIONAL ? userId : undefined }
                ],
            },
            include: {
                professional: true,
                user: true,
            },
        });

        if (!service) {
            this.logger.warn(`User ${userId} does not have an active service associated with chatId: ${chatId}`);
            throw new ForbiddenException('You do not have access to this chat');
        }

        try {
            const messages = await this.prisma.message.findMany({
                where: { chatId },
                include: {
                    senderUser: true,
                    senderProfessional: true,
                },
                orderBy: {
                    createdAt: 'asc',
                },
            });

            if (!messages.length) {
                this.logger.warn(`No messages found for chatId: ${chatId}`);
                throw new NotFoundException('No messages found for this chat');
            }

            this.logger.log(`Found ${messages.length} messages for chatId: ${chatId}`);
            return messages;
        } catch (error: any) {
            this.logger.error(`Error fetching messages for chatId: ${chatId} - ${error.message}`);
            throw error;
        }
    }

    async createMessage(createChatDto: CreateChatDto, user: any) {
        this.logger.log(`Creating message for chatId: ${createChatDto.chatId} by userId: ${user.id}`);

        const serviceCondition = user.role === Role.USER ? { userId: user.id } : { professionalId: user.id };

        const service = await this.prisma.service.findFirst({
            where: {
                id: createChatDto.chatId,
                ...serviceCondition,
            },
            include: {
                professional: true,
                user: true,
            },
        });

        if (!service) {
            this.logger.warn(`User ${user.id} does not have an active service associated with chatId: ${createChatDto.chatId}`);
            throw new ForbiddenException('You do not have access to this chat');
        }

        try {
            const messageData: {
                chatId: string;
                message: string;
                senderRole: Role;
                senderUserId?: string;
                senderProfessionalId?: string;
            } = {
                chatId: createChatDto.chatId,
                message: createChatDto.message,
                senderRole: user.role,
            };

            if (user.role === Role.USER) {
                messageData.senderUserId = user.id;
            } else {
                messageData.senderProfessionalId = user.id;
            }

            const message = await this.prisma.message.create({
                data: messageData,
            });

            this.logger.log(`Message created with id: ${message.id} for chatId: ${createChatDto.chatId}`);
            return message;
        } catch (error: any) {
            this.logger.error(`Error creating message for chatId: ${createChatDto.chatId} - ${error.message}`);
            throw error;
        }
    }
}