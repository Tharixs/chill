/*
  Warnings:

  - A unique constraint covering the columns `[email_verify_token]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `email_verified` BOOLEAN NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_verify_token_key` ON `User`(`email_verify_token`);
