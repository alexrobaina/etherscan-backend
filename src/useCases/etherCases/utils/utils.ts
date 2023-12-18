import axios from 'axios'

export const calculateExchangeRate = async (
  currency: string,
  amount: string,
): Promise<number> => {
  const ethPriceResponse = await axios.get(
    `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API_KEY}`,
  )

  if (currency === 'USD') {
    const ethPriceInUSD = ethPriceResponse.data.result.ethusd
    return parseInt(amount) / ethPriceInUSD
  }

  if (currency === 'EUR') {
    const exchange = await axios.get(
      `http://data.fixer.io/api/latest?access_key=${process.env.API_LAYER_KEY}`,
    )
    const usdToEurRate = exchange.data.rates['EUR']
    const ethPriceInEUR = ethPriceResponse.data.result.ethusd * usdToEurRate
    return parseInt(amount) / ethPriceInEUR
  }

  throw new Error('Unsupported currency')
}
