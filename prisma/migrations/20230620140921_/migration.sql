-- CreateTable
CREATE TABLE "favoriteClans" (
    "id" SERIAL NOT NULL,
    "idClan" INTEGER NOT NULL,
    "idUser" INTEGER NOT NULL,
    "emailUser" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "favoriteClans_pkey" PRIMARY KEY ("id")
);
