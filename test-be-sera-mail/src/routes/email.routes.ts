import { Router } from 'express'
import { sendEmail } from '../controllers/email.controller'

export const emailRouter: Router = Router()
emailRouter.post('/sendEmail', sendEmail)
