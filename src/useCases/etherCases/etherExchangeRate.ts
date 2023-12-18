import { Response, Request } from 'express'
import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../constants/constants'
import { prisma } from '../../database/prisma'

import { calculateExchangeRate } from './utils/utils'

export const getEtherExchangeRate = async (req: Request, res: Response) => {
  const { currency, amount } = req.query

  try {
    const etherExchangeRate = await calculateExchangeRate(
      currency as string,
      amount as string,
    )

    res.status(200).json({
      ok: true,
      amount,
      currency,
      etherExchangeRate,

      message: SUCCESS_RESPONSE,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      ok: false,
      error: Error,
      message: SOMETHING_IS_WRONG,
    })
  }
}

export const getAllExchangeRates = async (req: Request, res: Response) => {
  const { addressId } = req.params

  try {
    const exchangeRates = await prisma.ethExchangeRate.findMany({
      where: {
        addressId: addressId,
      },
    })

    res.status(200).json({
      ok: true,
      exchangeRates,
      message: SUCCESS_RESPONSE,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      ok: false,
      error: Error,
      message: SOMETHING_IS_WRONG,
    })
  }
}

export const create = async (req: Request, res: Response) => {
  const { currency, address, amount, exchangeRate } = req.body

  try {
    const addressFinded = await prisma.address.findFirst({
      where: {
        // @ts-ignore
        userId: req?.user?.id,
        address: address as string,
      },
    })

    if (!addressFinded) {
      return res.status(404).json({
        ok: false,
        message: 'Address not found',
      })
    }

    await prisma.ethExchangeRate.create({
      data: {
        exchangeRate,
        amount: amount,
        currency: currency as string,
        addressId: addressFinded.id as string,
      },
    })

    res.status(204).json({
      ok: true,
      message: SUCCESS_RESPONSE,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      ok: false,
      error: Error,
      message: SOMETHING_IS_WRONG,
    })
  }
}
