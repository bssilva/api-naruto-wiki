-- CreateTable
CREATE TABLE "favoriteCharacters" (
    "id" SERIAL NOT NULL,
    "idCharacter" INTEGER NOT NULL,
    "emailUser" TEXT NOT NULL,

    CONSTRAINT "favoriteCharacters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "favoriteCharacters_emailUser_idCharacter_key" ON "favoriteCharacters"("emailUser", "idCharacter");
