/*
  Warnings:

  - Added the required column `info` to the `characters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "characters" ADD COLUMN     "info" JSONB NOT NULL;
