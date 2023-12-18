import { Response, Request } from 'express'
import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../constants/constants'
import { prisma } from '../../database/prisma'

export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const { id } = req?.params as any

    const address = await prisma.address.findUnique({
      where: { id: id as string },
    })

    if (!address) {
      return res.status(404).json({
        ok: false,
        message: 'Address not found',
      })
    }

    await prisma.address.delete({
      where: { id: id as string },
    })

    res.status(204).json({
      ok: true,
      message: SUCCESS_RESPONSE,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error,
      ok: false,
      message: SOMETHING_IS_WRONG,
    })
  }
}
