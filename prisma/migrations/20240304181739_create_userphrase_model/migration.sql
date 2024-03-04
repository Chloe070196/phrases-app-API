-- CreateTable
CREATE TABLE "UserPhrase" (
    "id" SERIAL NOT NULL,
    "phraseId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'NEW',
    "timesAttempted" INTEGER NOT NULL,
    "timesSeen" INTEGER NOT NULL,
    "timesUsed" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPhrase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPhrase_phraseId_key" ON "UserPhrase"("phraseId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPhrase_userId_key" ON "UserPhrase"("userId");

-- AddForeignKey
ALTER TABLE "UserPhrase" ADD CONSTRAINT "UserPhrase_phraseId_fkey" FOREIGN KEY ("phraseId") REFERENCES "Phrase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPhrase" ADD CONSTRAINT "UserPhrase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
