/* eslint-disable @typescript-eslint/no-unused-vars */
import { type Application, type Router } from 'express'
import { authRouter } from './auth.routes'

const _routes: Array<[string, Router]> = [['/api/v1/auth', authRouter]]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}
