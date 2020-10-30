const request = require('axios');
const jwt = require('jsonwebtoken');
const secretAccess = process.env.SECRET_ACCESS || 'secret';
const app = require('../../src/Server/app');
const generalPassword = process.env.CLIENT_GENERAL_PASSWORD || '123';

describe('End to end testing', () => {
  describe('When client requests an accessToken providing credentials', () => {
    let clientTestData;
    const lohalhost = 'http://localhost:3000';

    beforeEach(() => {
      clientTestData = {
        id: 'a0ece5db-cd14-4f21-812f-966633e7be86',
        name: 'Britney',
        email: 'britneyblankenship@quotezart.com',
        role: 'admin',
      };
    });

    describe('Successful cases', () => {
      it('When credentials are provided, expect token to be returned', async () => {
        //Arrange
        let credentials = {
          username: clientTestData.name,
          password: generalPassword,
        };

        // Act
        const res = await request.post(
          `${lohalhost}/api/v1/login`,
          credentials
        );

        // Assert
        expect(res.status).toBe(200);
        expect(res.data.token).toBeDefined();
        expect(res.data.type).toBe('Bearer');
        expect(res.data.expires_in).toBe(600);
      });
    });
  });
});
