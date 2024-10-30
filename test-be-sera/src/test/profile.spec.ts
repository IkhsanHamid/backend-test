import { expect } from 'chai'
import { findUserbyEmail } from '../services/auth.service'

describe('findUserbyEmail', () => {
  it('should return user data if found', async () => {
    // Arrange
    const email = 'test@example.com'
    const userMock = [{ id: 1, email: 'test@example.com', name: 'Test User' }]

    // Act
    const result = await findUserbyEmail(email)

    // Assert
    expect(result).to.deep.equal({ msg: 'success', data: userMock })
  })

  it('should handle error and log it if user not found', async () => {
    // Arrange
    const email = 'notfound@example.com'

    // Act
    try {
      await findUserbyEmail(email)
    } catch (error: any) {
      // Assert
      expect(error.message).to.equal('User not found')
    }
  })
})
