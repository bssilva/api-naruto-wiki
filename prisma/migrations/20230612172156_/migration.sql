-- CreateTable
CREATE TABLE "characters" (
    "id" SERIAL NOT NULL,
    "about" TEXT[],
    "info" JSONB NOT NULL,
    "page" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "images" TEXT[],

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);
