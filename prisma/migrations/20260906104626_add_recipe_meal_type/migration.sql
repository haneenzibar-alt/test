/*
  Warnings:

  - You are about to drop the column `allergens` on the `Recipe` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SavedMeal" DROP CONSTRAINT "SavedMeal_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "SavedMeal" DROP CONSTRAINT "SavedMeal_userId_fkey";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "allergens",
ADD COLUMN     "dietType" "DietType",
ADD COLUMN     "goal" "HealthGoal";

-- AddForeignKey
ALTER TABLE "SavedMeal" ADD CONSTRAINT "SavedMeal_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
