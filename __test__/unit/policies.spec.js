const faker = require('faker');
const { Policies } = require('../../src/Policies');

describe('> Clients<module>', () => {
  describe('getOneById(req,res,next)', () => {
    let testedModule, policyTestData;

    beforeEach(() => {
      let fakeDataAcces = () => {
        return {};
      };
      testedModule = Policies({
        dataAcces: fakeDataAcces(),
      });
      policyTestData;
    });

    describe('Successful cases', () => {
      it('When ... is provided, expect ', () => {
        //Arrange
        let clientId = faker.random.uuid();
        let req = {};
        let res = {};

        // Act
        // todo, test middleware
        // testedModule.getOneById(req,res)

        // Assert
        expect(resp).toBe(clientId);
      });
    });
    describe('Fail cases', () => {
      it('When ... is provided, expect ', () => {
        try {
          //Arrange
          let clientId = faker.random.uuid();
          let req = {};
          let res = {};
          let next = {};

          // Act
          // testedModule.getOneById(req,res)

          // todo, test middleware
        } catch (err) {
          // Assert
          expect(err.message).toBe('');
        }
      });
    });
  });
  describe('list(req,res,next)', () => {
    let testedModule, policyTestData;

    beforeEach(() => {
      let fakeDataAcces = () => {
        return {};
      };
      testedModule = Policies({
        dataAcces: fakeDataAcces(),
      });
      policyTestData;
    });

    describe('When id of type string is provided, expect ...', () => {
      it('When ... is provided, expect ...', () => {
        //Arrange
        let clientId = faker.random.uuid();
        let req = {};
        let res = {};

        // Act
        // todo, test middleware
        // testedModule.list(req,res)

        // Assert
        expect(resp).toBe(clientId);
      });
    });
    describe('Fail cases', () => {
      it('When ... is provided, expect ', () => {
        try {
          //Arrange
          let clientId = faker.random.uuid();
          let req = {};
          let res = {};
          let next = {};

          // Act
          // testedModule.list(req,res)

          // todo, test middleware
        } catch (err) {
          // Assert
          expect(err.message).toBe('');
        }
      });
    });
  });
});
