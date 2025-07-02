/*
  Warnings:

  - Changed the type of `intensity` on the `Activity` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Intensity" AS ENUM ('low', 'medium', 'high');

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "intensity",
ADD COLUMN     "intensity" "Intensity" NOT NULL;
