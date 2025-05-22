-- AlterTable
ALTER TABLE `User` ADD COLUMN `email_verified` BOOLEAN NULL,
    ADD COLUMN `email_verify_token` VARCHAR(191) NULL;
