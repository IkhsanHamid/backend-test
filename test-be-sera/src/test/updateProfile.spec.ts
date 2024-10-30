import { expect } from 'chai'
import { updateProfile } from '../controllers/auth.controller'
import { Request, Response } from 'express'

describe('updateProfile Controller', () => {
  it('should update profile successfully', async () => {
    // Arrange
    const req = {
      body: { first_name: 'John', last_name: 'Doe' },
      locals: { id: 1 }
    } as Partial<Request>
    const res = {
      send: (response: any) => response
    } as Partial<Response>

    // Act
    const result = await updateProfile(req as Request, res as Response)

    // Assert
    expect(result).to.deep.equal({
      status: 0,
      message: 'Update Pofile berhasil',
      data: { id: 1, first_name: 'John', last_name: 'Doe' }
    })
  })

  it('should return error if validation fails', async () => {
    // Arrange
    const req = {
      body: { first_name: 'Jo', last_name: 'Do' },
      locals: { id: 1 }
    } as Partial<Request>
    const res = {
      send: (response: any) => response
    } as Partial<Response>

    // Act
    const result = await updateProfile(req as Request, res as Response)

    // Assert
    expect(result).to.deep.equal({
      status: 102,
      message: '"first_name" length must be at least 3 characters long',
      data: null
    })
  })
})
