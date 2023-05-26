-- CreateTable
CREATE TABLE "clans" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "clans_pkey" PRIMARY KEY ("id")
);
