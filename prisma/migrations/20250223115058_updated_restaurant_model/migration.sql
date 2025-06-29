/*
  Warnings:

  - You are about to alter the column `empCount` on the `restaurant` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[name]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `restaurant` MODIFY `empCount` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Restaurant_name_key` ON `Restaurant`(`name`);
