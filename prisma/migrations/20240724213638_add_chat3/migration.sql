/*
  Warnings:

  - A unique constraint covering the columns `[serviceId]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `serviceId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_chat_fkey`;

-- AlterTable
ALTER TABLE `Message` ADD COLUMN `serviceId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Chat_serviceId_key` ON `Chat`(`serviceId`);

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `Chat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
