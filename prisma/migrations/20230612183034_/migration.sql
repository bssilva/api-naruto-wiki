/*
  Warnings:

  - Made the column `info` on table `characters` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "characters" ALTER COLUMN "info" SET NOT NULL;
