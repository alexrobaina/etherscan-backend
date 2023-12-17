import { Response, Request } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config/config'
import { MUST_AUTHENTICATED } from '../constants/constants'

//=====================================
// CONFIG token
//=====================================

export const verifyToken = function (req: Request, res: Response, next: any) {
  const headersToken = req.headers?.authorization || ''
  const token: string = headersToken.split(' ')[1]

  jwt.verify(token, config.JWT_SEED, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          mensaje: MUST_AUTHENTICATED,
        },
      })
    }

    req.user = decoded
    next()
  })
}
