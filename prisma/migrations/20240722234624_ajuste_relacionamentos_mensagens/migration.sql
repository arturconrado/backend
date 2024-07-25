-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_chatService_fkey`;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `Service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
