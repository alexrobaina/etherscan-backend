import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../constants/constants'
import { Request, Response } from 'express'

import { prisma } from '../../database/prisma'
import { getAddressBalance } from '../../services/getBalance'

export const getAddresses = async (req: Request, res: Response) => {
  const filter = req.query as {
    page?: string
    search?: string
    address: string
  }

  const itemsPerPage = 10
  const currentPage = parseInt(filter.page || '1')

  // Calculate skip and take based on currentPage
  const skip = (currentPage - 1) * itemsPerPage
  const take = itemsPerPage

  const query: any = {
    where: {
      // @ts-ignore
      userId: req?.user?.id,
    },
    orderBy: { isFavorite: 'desc' },
    skip,
    take,
    select: {
      name: true,
      address: true,
      id: true,
      isFavorite: true,
      isOlderThanOnaYear: true,
    },
  }

  if (filter.search) {
    query.where.OR = [
      { address: { contains: filter.search } },
      { name: { contains: filter.search } },
    ]
  }
  try {
    const addresses = await prisma.address.findMany(query)

    const countAddresses = await prisma.address.count({
      where: query.where,
    })

    res.status(200).json({
      ok: true,
      addresses,
      total: countAddresses,
      message: SUCCESS_RESPONSE,
    })
  } catch (error) {
    if (error) {
      console.log(error)
      return res.status(500).json({
        error,
        ok: false,
        message: SOMETHING_IS_WRONG,
      })
    }
  }
}

export const getAddress = async (req: Request, res: Response) => {
  const { address: addressParams } = req.params

  const address = await prisma.address.findFirst({
    where: {
      address: addressParams as string,
      // @ts-ignore
      userId: req?.user?.id,
    },
    select: {
      id: true,
      name: true,
      address: true,
      isFavorite: true,
      isOlderThanOnaYear: true,
    },
  })

  const addressBalance = await getAddressBalance(addressParams as string)
  try {
    res.status(200).json({
      ok: true,
      addressBalance,
      // @ts-ignore
      addressId: address.id,
      address: address?.address,
      message: SUCCESS_RESPONSE,
      // @ts-ignore
      isOlderThanOnaYear: address.isOlderThanOnaYear,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: true,
      message: SOMETHING_IS_WRONG,
      error,
    })
  }
}
