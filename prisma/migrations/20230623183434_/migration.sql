/*
  Warnings:

  - A unique constraint covering the columns `[idUser,idClan]` on the table `favoriteClans` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "favoriteClans_idClan_key";

-- CreateIndex
CREATE UNIQUE INDEX "favoriteClans_idUser_idClan_key" ON "favoriteClans"("idUser", "idClan");
