/*
  Warnings:

  - Added the required column `category` to the `Phrase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortExample` to the `Phrase` table without a default value. This is not possible if the table is not empty.
  - Made the column `example` on table `Phrase` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Phrase" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "shortExample" TEXT NOT NULL,
ALTER COLUMN "example" SET NOT NULL;
