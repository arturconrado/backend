/*
  Warnings:

  - Added the required column `date` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Schedule` MODIFY `date` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Service` ADD COLUMN `date` VARCHAR(191) NOT NULL;
