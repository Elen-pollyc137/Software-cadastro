-- CreateTable
CREATE TABLE "Familyreference" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "nis" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "naturalness" TEXT NOT NULL,
    "nameMother" TEXT NOT NULL,
    "nameFather" TEXT NOT NULL,
    "birthdayDate" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "matrialStatus" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "elderlyPerson" TEXT NOT NULL,
    "disabledPerson" TEXT NOT NULL,
    "folderNunber" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Familyreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
