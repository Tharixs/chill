-- CreateTable
CREATE TABLE `Film` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `thumbnail` VARCHAR(191) NOT NULL,
    `videoUrl` VARCHAR(191) NOT NULL,
    `type` ENUM('NEW_RELEASE', 'TOP_RATED', 'PREMIUM') NOT NULL DEFAULT 'NEW_RELEASE',
    `tag` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `maxAge` INTEGER NOT NULL DEFAULT 0,
    `totalEpisode` INTEGER NOT NULL DEFAULT 0,
    `rating` DOUBLE NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FilmCategory` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Film` ADD CONSTRAINT `Film_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `FilmCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
