/*
  Warnings:

  - You are about to drop the column `title` on the `Text` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Text_title_key";

-- AlterTable
ALTER TABLE "Text" DROP COLUMN "title";
