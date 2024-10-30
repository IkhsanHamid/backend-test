import { expect } from 'chai'
import { Request, Response } from 'express'
import { createSession } from '../controllers/auth.controller'

describe('createSession Controller', () => {
  it('should return 102 if validation fails', async () => {
    // Arrange
    const req = { body: { email: '', password: '' } } as Partial<Request>
    const res = {
      send: (response: any) => response
    } as Partial<Response>

    // Act
    const result = await createSession(req as Request, res as Response)

    // Assert
    expect(result).to.deep.equal({ status: 102, message: '"email" is not allowed to be empty', data: null })
  })

  it('should return 401 if email is not found', async () => {
    // Arrange
    const req = { body: { email: 'notfound@example.com', password: 'password123' } } as Partial<Request>
    const res = {
      status: (code: number) => res,
      send: (response: any) => response
    } as Partial<Response>

    // Act
    const result = await createSession(req as Request, res as Response)

    // Assert
    expect(result).to.deep.equal({ status: false, statusCode: 401, message: 'Invalid credentials' })
  })

  it('should return 401 if password is invalid', async () => {
    // Arrange
    const req = { body: { email: 'test@example.com', password: 'wrongpassword' } } as Partial<Request>
    const res = {
      status: (code: number) => res,
      send: (response: any) => response
    } as Partial<Response>

    // Act
    const result = await createSession(req as Request, res as Response)

    // Assert
    expect(result).to.deep.equal({ status: false, statusCode: 401, message: 'Invalid password' })
  })

  it('should return success message if login is successful', async () => {
    // Arrange
    const req = { body: { email: 'test@example.com', password: 'password123' } } as Partial<Request>
    const res = {
      send: (response: any) => response
    } as Partial<Response>

    // Act
    const result = await createSession(req as Request, res as Response)

    // Assert
    expect(result).to.deep.equal({
      status: 0,
      statusCode: 201,
      message: 'login success',
      data: { accessToken: 'token', refreshToken: 'token' }
    })
  })
})
