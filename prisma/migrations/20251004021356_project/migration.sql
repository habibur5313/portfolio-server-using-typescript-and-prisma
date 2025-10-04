-- CreateTable
CREATE TABLE "public"."Project" (
    "id" SERIAL NOT NULL,
    "projectName" TEXT NOT NULL,
    "projectCategory" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "liveLink" TEXT NOT NULL,
    "githubLink" TEXT NOT NULL,
    "githubLinkServer" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "feature" TEXT NOT NULL,
    "technologyUsed" TEXT[],
    "npmPackageUsed" TEXT[],
    "endDate" TIMESTAMP(3) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
