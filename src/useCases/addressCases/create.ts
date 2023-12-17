import { Response, Request } from 'express'
import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../constants/constants'
import { prisma } from '../../database/prisma'

export const create = async (req: Request, res: Response) => {
  try {
    const address = await prisma.address.create({
      data: req.body,
    })

    res.status(201).json({
      address,
      ok: true,
      message: SUCCESS_RESPONSE,
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
