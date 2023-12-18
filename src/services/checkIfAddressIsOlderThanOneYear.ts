import axios from 'axios'

export const checkIfAddressIsOlderThanOneYear = async (
  address: string,
): Promise<boolean> => {
  const firstTransaction = await getFirstTransactionDate(address)
  if (!firstTransaction) return false

  const oneYearAgo = new Date(
    new Date().setFullYear(new Date().getFullYear() - 1),
  )
  return firstTransaction < oneYearAgo
}

export const getFirstTransactionDate = async (
  address: string,
): Promise<Date | null> => {
  try {
    const response = await axios.get(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`,
    )

    const transactions = response.data.result
    if (transactions && transactions.length > 0) {
      const firstTransactionTimestamp = transactions[0].timeStamp
      return new Date(firstTransactionTimestamp * 1000)
    }
    return null
  } catch (error) {
    console.error('Error fetching transactions:', error)
    throw error
  }
}
