/*
  Warnings:

  - You are about to drop the column `icon` on the `favoriteClans` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `favoriteClans` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `favoriteClans` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "favoriteClans" DROP COLUMN "icon",
DROP COLUMN "link",
DROP COLUMN "name";
