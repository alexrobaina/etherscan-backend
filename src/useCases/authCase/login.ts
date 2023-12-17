import { Response, Request } from 'express'
import { SOMETHING_IS_WRONG } from '../../constants/constants'
import { prisma } from '../../database/prisma'
import { createToken } from './authModule'
import { config } from '../../config/config'

//=====================================
//        LOGIN USERS = POST
//=====================================

export const login = async (req: Request, res: Response) => {
  try {
    if (req.body.email) {
      let user = await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
      })

      if (!user) {
        user = await prisma.user.create({
          data: {
            email: req.body.email,
          },
        })
      }

      const token = await createToken({ id: user.id, email: user.email })

      res.status(200).json({
        token,
        ok: true,
        message: 'User logged in',
      })
    }
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      code: 4,
      ok: false,
      error: Error,
      message: SOMETHING_IS_WRONG,
    })
  }
}
