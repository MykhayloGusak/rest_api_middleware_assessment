const faker = require('faker');
const { Clients } = require('../../src/Components/Users');

describe('> Clients<module>', () => {
  describe('getOneById(req,res,next)', () => {
    let testedModule, userTestData;

    beforeEach(() => {
      let fakeDataAcces = () => {
        return {};
      };
      testedModule = Clients({
        dataAcces: fakeDataAcces(),
      });
      userTestData;
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
    let testedModule, userTestData;

    beforeEach(() => {
      let fakeDataAcces = () => {
        return {};
      };
      testedModule = Clients({
        dataAcces: fakeDataAcces(),
      });
      userTestData;
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
