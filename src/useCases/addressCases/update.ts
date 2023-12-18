import { Response, Request } from 'express'
import { SOMETHING_IS_WRONG, SUCCESS_RESPONSE } from '../../constants/constants'
import { prisma } from '../../database/prisma'

export const update = async (req: Request, res: Response) => {
  // clean body, remove id and files are ''
  Object.keys(req.body).forEach((key) => {
    if (req.body[key] === '') {
      delete req.body[key]
    }
  })

  try {
    await prisma.address.updateMany({
      where: {
        id: req.body.id,
      },
      data: req.body,
    })

    res.status(204).json({
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
