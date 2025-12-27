-- CreateTable
CREATE TABLE "userdetails" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userdetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "googleauth" (
    "id" TEXT NOT NULL,
    "googleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "googleauth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credentialsauth" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "credentialsauth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userdetails_email_key" ON "userdetails"("email");

-- CreateIndex
CREATE UNIQUE INDEX "googleauth_googleId_key" ON "googleauth"("googleId");

-- AddForeignKey
ALTER TABLE "googleauth" ADD CONSTRAINT "googleauth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userdetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credentialsauth" ADD CONSTRAINT "credentialsauth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userdetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
