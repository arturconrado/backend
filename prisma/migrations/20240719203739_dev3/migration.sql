/*
  Warnings:

  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Professional` MODIFY `name` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `password` VARCHAR(191) NOT NULL;
