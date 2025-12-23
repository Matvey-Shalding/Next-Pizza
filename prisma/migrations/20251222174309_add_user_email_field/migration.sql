/*
  Warnings:

  - Added the required column `ingredientsKey` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "ingredientsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "ingredientsKey" TEXT NOT NULL;
