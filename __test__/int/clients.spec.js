const request = require('supertest');
const jwt = require('jsonwebtoken');
const secretAccess = process.env.SECRET_ACCESS || 'secret';
const app = require('../../src/Server/app');

describe('> /client endpoints', () => {
  describe('GET /api/v1/clients/:id', () => {
    let clientToken, clientTestData;

    beforeEach(() => {
      clientTestData = {
        id: 'a0ece5db-cd14-4f21-812f-966633e7be86',
        name: 'Britney',
        email: 'britneyblankenship@quotezart.com',
        role: 'admin',
      };

      clientToken = jwt.sign(clientTestData, secretAccess, {
        expiresIn: '1m',
      });
    });

    describe('Successful cases', () => {
      it('When id and token are provided, expect to return client details', async () => {
        //Arrange
        let token = clientToken;
        let clientId = clientTestData.id;

        // Act
        const res = await request(app)
          .get(`/api/v1/clients/${clientId}`)
          .set('Authorization', 'Bearer ' + token);

        // Assert
        expect(res.status).toBe(200);
        expect(res.body).toEqual(clientTestData);
      });
    });
  });
});
