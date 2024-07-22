-- AlterTable
ALTER TABLE `Schedule` MODIFY `isActive` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Service` MODIFY `isActive` BOOLEAN NOT NULL DEFAULT true;
