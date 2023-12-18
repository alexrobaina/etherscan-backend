-- CreateTable
CREATE TABLE "EthExchangeRate" (
    "id" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "amount" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EthExchangeRate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EthExchangeRate" ADD CONSTRAINT "EthExchangeRate_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
