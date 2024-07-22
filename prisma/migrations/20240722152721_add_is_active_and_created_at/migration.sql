/*
  Warnings:

  - Added the required column `isActive` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActive` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Schedule` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `isActive` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `Service` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `isActive` BOOLEAN NOT NULL;
