/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `clans` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "clans_name_key" ON "clans"("name");
