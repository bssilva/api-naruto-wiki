/*
  Warnings:

  - You are about to drop the column `idUser` on the `favoriteClans` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[emailUser,idClan]` on the table `favoriteClans` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emailUser` to the `favoriteClans` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "favoriteClans_idUser_idClan_key";

-- AlterTable
ALTER TABLE "favoriteClans" DROP COLUMN "idUser",
ADD COLUMN     "emailUser" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "favoriteClans_emailUser_idClan_key" ON "favoriteClans"("emailUser", "idClan");
