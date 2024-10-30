import { expect } from 'chai'
import { destroySession } from '../controllers/auth.controller'
import * as authService from '../services/auth.service'
import { Request, Response } from 'express'
import sinon from 'sinon'

describe('destroySession Controller', () => {
  it('should return error if validation fails', async () => {
    // Arrange
    const req = {
      body: { accessToken: '' } // Invalid token to trigger validation failure
    } as Partial<Request>
    const res = {
      send: (response: any) => response
    } as Partial<Response>

    // Act
    const result = await destroySession(req as Request, res as Response)

    // Assert
    expect(result).to.deep.equal({ status: 102, message: 'Invalid access token', data: null })
  })

  it('should log out successfully', async () => {
    // Arrange
    const req = {
      body: { accessToken: 'validAccessToken' }
    } as Partial<Request>
    const res = {
      send: (response: any) => response
    } as Partial<Response>

    // Act
    const result = await destroySession(req as Request, res as Response)

    // Assert
    expect(result).to.deep.equal({ status: 0, message: 'logout success' })
  })

  it('should handle error when destroying session fails', async () => {
    // Arrange
    const req = {
      body: { accessToken: 'validAccessToken' }
    } as Partial<Request>
    const res = {
      send: (response: any) => response
    } as Partial<Response>

    // Mocking the destroyAuth function to throw an error
    const destroyAuthStub = sinon.stub(authService, 'destroyAuth').throws(new Error('Failed to destroy session'))

    // Act
    const result = await destroySession(req as Request, res as Response)

    // Assert
    expect(result).to.deep.equal({ status: 102, message: 'Failed to destroy session', data: null })

    destroyAuthStub.restore()
  })
})
