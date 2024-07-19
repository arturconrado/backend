/*
  Warnings:

  - You are about to alter the column `date` on the `Service` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Service` MODIFY `date` VARCHAR(191) NOT NULL;
