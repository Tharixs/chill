/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Film` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Genre` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Film` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Genre` MODIFY `updatedAt` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Film_id_key` ON `Film`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Genre_id_key` ON `Genre`(`id`);
