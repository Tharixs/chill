/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Film` table. All the data in the column will be lost.
  - You are about to drop the `FilmCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `genreId` to the `Film` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Film` DROP FOREIGN KEY `Film_categoryId_fkey`;

-- DropIndex
DROP INDEX `Film_categoryId_fkey` ON `Film`;

-- AlterTable
ALTER TABLE `Film` DROP COLUMN `categoryId`,
    ADD COLUMN `genreId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `FilmCategory`;

-- CreateTable
CREATE TABLE `Genre` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Film` ADD CONSTRAINT `Film_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `Genre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
