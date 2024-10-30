import { type Request, type Response } from 'express'
import { createEmail } from '../services/email.service'

export const sendEmail = async (req: Request, res: Response) => {
  try {
    const user = await createEmail(req.body.email)
    return res.send({ status: 0, message: 'Sukses', data: user })
  } catch (error) {
    return res.send({ status: 102, message: error, data: null })
  }
}
