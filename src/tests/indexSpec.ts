import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('This suite tests the /api/images endpoint', (): void => {
  it('tests the response from the endpoint', async (): Promise<void> => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(200);
  });
});
