-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_chatId_fkey`;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_chatService_fkey` FOREIGN KEY (`chatId`) REFERENCES `Service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
