/*
  Warnings:

  - The `exchangeRate` column on the `EthExchangeRate` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "EthExchangeRate" DROP COLUMN "exchangeRate",
ADD COLUMN     "exchangeRate" DOUBLE PRECISION;
