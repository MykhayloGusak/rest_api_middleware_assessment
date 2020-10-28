const faker = require('faker');
const { DataAccess } = require('../../src/DataAccess');

describe('> DataAccess<module>', () => {
  describe('findOne(id)', () => {
    let testedModule;

    beforeEach(() => {
      const fakeAuth = () => {};
      const fakeCahce = () => {};

      testedModule = DataAccess({
        auth: fakeAuth(),
        caching: fakeCahce(),
        // ...
      });
    });
  });
  // ...
});
