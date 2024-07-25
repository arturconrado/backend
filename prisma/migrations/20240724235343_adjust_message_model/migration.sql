/*
  Warnings:

  - You are about to drop the column `senderId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `Message` table. All the data in the column will be lost.
  - Made the column `professionalId` on table `Chat` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Chat` DROP FOREIGN KEY `Chat_professionalId_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_senderProfessional_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_senderUser_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_serviceId_fkey`;

-- AlterTable
ALTER TABLE `Chat` MODIFY `professionalId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Message` DROP COLUMN `senderId`,
    DROP COLUMN `serviceId`,
    ADD COLUMN `senderProfessionalId` VARCHAR(191) NULL,
    ADD COLUMN `senderUserId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_professionalId_fkey` FOREIGN KEY (`professionalId`) REFERENCES `Professional`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_senderUserId_fkey` FOREIGN KEY (`senderUserId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_senderProfessionalId_fkey` FOREIGN KEY (`senderProfessionalId`) REFERENCES `Professional`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
