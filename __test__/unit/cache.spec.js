const faker = require('faker');
const { Cache } = require('../../src/Cache');

describe('> Cache<module>', () => {
  describe('setItem(keyName,value) =>', () => {
    let testingModule, cacheTestKey, cacheTestData;
    beforeEach(() => {
      testingModule = Cache();

      cacheTestKey = faker.random.uuid();
      cacheTestData = {
        etag: faker.random.uuid(),
        value: 'some data',
      };
    });
    describe('Successful cases', () => {
      it('when keyName and Value are provided, item is saved and undefined is returned', () => {
        //Arrange
        let keyName = cacheTestKey;
        let value = cacheTestData;

        // Act
        const res = testingModule.setItem(keyName, value);

        // Asser
        expect(res).toBeUndefined();
      });
    });
  });
  describe('geItem(keyName) =>', () => {
    let testingModule, cacheTestKey, cacheTestData;
    beforeEach(() => {
      testingModule = Cache();

      cacheTestKey = faker.random.uuid();
      cacheTestData = {
        etag: faker.random.uuid(),
        value: 'some data',
      };
    });
    describe('Successful cases', () => {
      it('when keyName of type string is proveded, item is found and returned', () => {
        //Arrange
        let keyName = cacheTestKey;
        let value = cacheTestData;
        testingModule.setItem(keyName, value);

        // Act
        const res = testingModule.getItem(keyName);

        // Asser
        expect(res).toEqual(value);
      });
    });
  });
  describe('removeItem(keyName) =>', () => {
    let testingModule, cacheTestKey, cacheTestData;
    beforeEach(() => {
      testingModule = Cache();

      cacheTestKey = faker.random.uuid();
      cacheTestData = {
        etag: faker.random.uuid(),
        value: 'some data',
      };
    });
    describe('Successful cases', () => {
      it('when keyName of type string is proveded, item is unexisting and null is returned', () => {
        //Arrange
        let keyName = cacheTestKey;
        let value = cacheTestData;
        testingModule.setItem(keyName, value);

        // Act
        testingModule.removeItem(keyName);

        // Asser
        const res = testingModule.getItem(keyName);

        expect(res).toBe(null);
      });
    });
  });
});
