-- DropForeignKey
ALTER TABLE `Chat` DROP FOREIGN KEY `Chat_professionalId_fkey`;

-- AlterTable
ALTER TABLE `Chat` MODIFY `professionalId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_professionalId_fkey` FOREIGN KEY (`professionalId`) REFERENCES `Professional`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
