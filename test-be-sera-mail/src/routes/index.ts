/* eslint-disable @typescript-eslint/no-unused-vars */
import { type Application, type Router } from 'express'
import { emailRouter } from './email.routes'

const _routes: Array<[string, Router]> = [['/api/v1/email', emailRouter]]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}
