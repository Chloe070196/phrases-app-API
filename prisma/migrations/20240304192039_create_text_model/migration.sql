-- CreateTable
CREATE TABLE "Text" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Text_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TextToUserPhrase" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Text_title_key" ON "Text"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Text_userId_key" ON "Text"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_TextToUserPhrase_AB_unique" ON "_TextToUserPhrase"("A", "B");

-- CreateIndex
CREATE INDEX "_TextToUserPhrase_B_index" ON "_TextToUserPhrase"("B");

-- AddForeignKey
ALTER TABLE "Text" ADD CONSTRAINT "Text_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TextToUserPhrase" ADD CONSTRAINT "_TextToUserPhrase_A_fkey" FOREIGN KEY ("A") REFERENCES "Text"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TextToUserPhrase" ADD CONSTRAINT "_TextToUserPhrase_B_fkey" FOREIGN KEY ("B") REFERENCES "UserPhrase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
