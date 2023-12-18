import axios from 'axios'

export const getAddressBalance = async (
  address: string,
): Promise<number | null> => {
  try {
    const response = await axios.get(
      `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${process.env.ETHERSCAN_API_KEY}`,
    )
    return response?.data?.result
  } catch (error) {
    console.error('Error fetching address balance:', error)
    throw error
  }
}
