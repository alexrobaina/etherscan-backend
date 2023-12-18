import { Response, Request } from 'express'
import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../constants/constants'
import axios from 'axios'

const etherscanApiKey = process.env.ETHERSCAN_API_KEY

export const getBalance = async (req: Request, res: Response) => {
  const { address } = req.query

  try {
    const addressBalance = await axios.get(
      `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${etherscanApiKey}`,
    )

    res.status(200).json({
      ok: true,
      message: SUCCESS_RESPONSE,
      addressBalance: addressBalance?.data?.result,
    })
  } catch (error) {
    if (error) {
      console.log(error)
      res.status(500).json({
        ok: false,
        error: Error,
        message: SOMETHING_IS_WRONG,
      })
    }
  }
}
