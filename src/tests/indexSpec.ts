import supertest from 'supertest'
import app from '../index'

const request = supertest(app)

describe('This suite tests the /api/images endpoint', () => {
  it('tests the response from the endpoint', async () => {
    const response = await request.get('/api/images')
    expect(response.status).toBe(200)
  })
})
