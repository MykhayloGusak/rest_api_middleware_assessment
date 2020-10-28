const faker = require('faker');
const { OAuth2 } = require('../../src/OAtuh2');

describe('> OAuth2<module>', () => {
  describe('login(req,res,next)', () => {
    let testedModule;

    beforeEach(() => {
      let fakeCache = () => {
        return {};
      };
      testedModule = OAuth2({
        cache: fakeCache(),
      });
    });

    describe('Successful cases', () => {
      //...
    });
    describe('Fail cases', () => {
      //...
    });
    //...
  });
  //...
});
