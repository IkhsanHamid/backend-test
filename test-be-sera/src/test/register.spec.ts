import { expect } from 'chai'
import { Request, Response } from 'express'
import { registerUser } from '../controllers/auth.controller'
import { describe, it } from 'mocha'

describe('registerUser Controller', () => {
  it('should return 102 status if validation fails', async () => {
    // Arrange
    const req = {
      body: {
        email: '',
        first_name: 'John',
        last_name: 'Doe',
        password: 'password123'
      }
    } as Partial<Request>
    const res = {
      status: (code: number) => res,
      send: (response: any) => response
    } as Partial<Response>

    // Act
    const result = await registerUser(req as Request, res as Response)

    // Assert
    expect(result).to.deep.equal({ status: 102, message: 'Invalid email', data: null })
  })

  it('should return 412 if email is already registered', async () => {
    // Arrange
    const req = { body: { email: 'test@example.com' } } as Partial<Request>
    const res = {
      status: (code: number) => res,
      send: (response: any) => response
    } as Partial<Response>

    // Act
    const result = await registerUser(req as Request, res as Response)

    // Assert
    expect(result).to.deep.equal({
      status: false,
      statusCode: 412,
      message: 'Email is Already register, please use the different email'
    })
  })

  it('should return 412 if user creation fails', async () => {
    // Arrange
    const req = { body: { email: 'test@example.com' } } as Partial<Request>
    const res = {
      status: (code: number) => res,
      send: (response: any) => response
    } as Partial<Response>

    // Act
    const result = await registerUser(req as Request, res as Response)

    // Assert
    expect(result).to.deep.equal({
      status: false,
      statusCode: 412,
      message: 'Failed Register User, please try again'
    })
  })

  it('should return success message if registration is successful', async () => {
    // Arrange
    const req = { body: { email: 'newuser@example.com' } } as Partial<Request>
    const res = {
      status: (code: number) => res,
      send: (response: any) => response
    } as Partial<Response>

    // Act
    const result = await registerUser(req as Request, res as Response)

    // Assert
    expect(result).to.deep.equal({
      status: 0,
      message: 'Registrasi berhasil silahkan login',
      data: null
    })
  })
})
