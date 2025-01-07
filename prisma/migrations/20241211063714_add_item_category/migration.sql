/*
  Warnings:

  - You are about to drop the column `cost` on the `items` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `items` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category_id` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "items" DROP COLUMN "cost",
ADD COLUMN     "category_id" INTEGER NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "item_categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "item_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "item_categories_name_key" ON "item_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "items_name_key" ON "items"("name");

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "item_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
