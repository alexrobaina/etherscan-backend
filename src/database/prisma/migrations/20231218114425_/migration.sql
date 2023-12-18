/*
  Warnings:

  - The `amount` column on the `EthExchangeRate` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "EthExchangeRate" DROP COLUMN "amount",
ADD COLUMN     "amount" INTEGER;
