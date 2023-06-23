/*
  Warnings:

  - A unique constraint covering the columns `[idClan]` on the table `favoriteClans` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "favoriteClans_idClan_key" ON "favoriteClans"("idClan");
