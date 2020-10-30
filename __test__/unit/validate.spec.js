const faker = require('faker');

const { validate } = require('../../src/Utils/validate');

describe('> validate<module>', () => {
  describe('> validate()', () => {
    describe('start validation some value', () => {
      it('when param is a "string", no error is throw', () => {
        try {
          //Arrange
          let paramValue = faker.random.word();

          // Act
          validate(paramValue);
        } catch (err) {
          // Assert
          expect('should not reach this point').toBeUndefined();
        }
      });
      it('when param is a "number", no error is throw', () => {
        try {
          //Arrange
          let paramValue = faker.random.number();

          // Act
          validate(paramValue);
        } catch (err) {
          // Assert
          expect('should not reach this point').toBeUndefined();
        }
      });
      it('when param is a "object", no error is throw', () => {
        try {
          //Arrange
          let paramValue = {};

          // Act
          validate(paramValue);
        } catch (err) {
          // Assert
          expect('should not reach this point').toBeUndefined();
        }
      });
      it('when param is a "function", no error is throw', () => {
        try {
          //Arrange
          let paramValue = () => {};

          // Act
          validate(paramValue);
        } catch (err) {
          // Assert
          expect('should not reach this point').toBeUndefined();
        }
      });
      it('when param is undefined, no error is throw', () => {
        try {
          //Arrange
          let paramValue = undefined;

          // Act
          validate(paramValue);
        } catch (err) {
          // Assert
          expect('should not reach this point').toBeUndefined();
        }
      });
    });
  });
  describe('> validate().string()', () => {
    describe('check if value is of "string" type', () => {
      it('when param is a "string", no error is throw', () => {
        try {
          //Arrange
          let paramValue = faker.random.word();

          // Act
          validate(paramValue).string();
        } catch (err) {
          // Assert
          expect('should not reach this point').toBeUndefined();
        }
      });
      it('when param is a "number", expected error is thrown', () => {
        try {
          //Arrange
          let paramValue = faker.random.number();

          // Act
          validate(paramValue).string();
        } catch (err) {
          // Assert
          expect(err.message).toBe(`'parameter' must be a string`);
        }
      });
      it('when param is a "object", no error is throw', () => {
        try {
          //Arrange
          let paramValue = {};

          // Act
          validate(paramValue).string();
        } catch (err) {
          // Assert
          expect(err.message).toBe(`'parameter' must be a string`);
        }
      });
      it('when param is a "function", no error is throw', () => {
        try {
          //Arrange
          let paramValue = () => {};

          // Act
          validate(paramValue).string();
        } catch (err) {
          // Assert
          expect(err.message).toBe(`'parameter' must be a string`);
        }
      });
      it('when param is undefined, no error is throw', () => {
        try {
          //Arrange
          let paramValue = undefined;

          // Act
          validate(paramValue).string();
        } catch (err) {
          // Assert
          expect(err.message).toBe(`'parameter' must be a string`);
        }
      });
    });
  });
  describe('> validate().number()', () => {
    describe('check if value is of "number" type', () => {
      it('when param is a "number", no error is throw', () => {
        try {
          //Arrange
          let paramValue = faker.random.number();

          // Act
          validate(paramValue).number();
        } catch (err) {
          // Assert
          expect('should not reach this point').toBeUndefined();
        }
      });
      it('when param is a "string", expected error is thrown', () => {
        try {
          //Arrange
          let paramValue = faker.random.word();

          // Act
          validate(paramValue).number();
        } catch (err) {
          // Assert
          expect(err.message).toBe(`'parameter' must be a number`);
        }
      });
      it('when param is a "object", no error is throw', () => {
        try {
          //Arrange
          let paramValue = {};

          // Act
          validate(paramValue).number();
        } catch (err) {
          // Assert
          expect(err.message).toBe(`'parameter' must be a number`);
        }
      });
      it('when param is a "function", no error is throw', () => {
        try {
          //Arrange
          let paramValue = () => {};

          // Act
          validate(paramValue).number();
        } catch (err) {
          // Assert
          expect(err.message).toBe(`'parameter' must be a number`);
        }
      });
      it('when param is undefined, no error is throw', () => {
        try {
          //Arrange
          let paramValue = undefined;

          // Act
          validate(paramValue).number();
        } catch (err) {
          // Assert
          expect(err.message).toBe(`'parameter' must be a number`);
        }
      });
    });
  });
  describe('> validate().integer()', () => {
    describe('check if value is of "number" type and integer', () => {
      it('when param is a "number" and integer, no error is throw', () => {
        try {
          //Arrange
          let paramValue = faker.random.number();

          // Act
          validate(paramValue).integer();
        } catch (err) {
          // Assert
          expect('should not reach this point').toBeUndefined();
        }
      });
      it('when param is a "number" and integer, no error is throw', () => {
        try {
          //Arrange
          let paramValue = faker.random.number();

          // Act
          validate(paramValue).number().integer();
        } catch (err) {
          // Assert
          expect('should not reach this point').toBeUndefined();
        }
      });
      it('when param is a float "number", expected error is thrown', () => {
        try {
          //Arrange
          let paramValue = faker.random.float();

          // Act
          validate(paramValue).integer();
        } catch (err) {
          // Assert
          expect(err.message).toBe(`'parameter' must be a integer`);
        }
      });
      it('when param is a float "number", expected error is thrown', () => {
        try {
          //Arrange
          let paramValue = faker.random.float();

          // Act
          validate(paramValue).number().integer();
        } catch (err) {
          // Assert
          expect(err.message).toBe(`'parameter' must be a integer`);
        }
      });
      it('when param is a "string", expected error is thrown', () => {
        try {
          //Arrange
          let paramValue = faker.random.word();

          // Act
          validate(paramValue).integer();
        } catch (err) {
          // Assert
          expect(err.message).toBe(`'parameter' must be a integer`);
        }
      });
      it('when param is a "string", expected error is thrown', () => {
        try {
          //Arrange
          let paramValue = faker.random.word();

          // Act
          validate(paramValue).number().integer();
        } catch (err) {
          // Assert
          expect(err.message).toBe(`'parameter' must be a number`);
        }
      });
      it('when param is a "object", no error is throw', () => {
        try {
          //Arrange
          let paramValue = {};

          // Act
          validate(paramValue).integer();
        } catch (err) {
          // Assert
          expect(err.message).toBe(`'parameter' must be a integer`);
        }
      });
      it('when param is a "object", no error is throw', () => {
        try {
          //Arrange
          let paramValue = {};

          // Act
          validate(paramValue).number().integer();
        } catch (err) {
          // Assert
          expect(err.message).toBe(`'parameter' must be a number`);
        }
      });
      it('when param is a "function", no error is throw', () => {
        try {
          //Arrange
          let paramValue = () => {};

          // Act
          validate(paramValue).number().integer();
        } catch (err) {
          // Assert
          expect(err.message).toBe(`'parameter' must be a number`);
        }
      });
      it('when param is a "function", no error is throw', () => {
        try {
          //Arrange
          let paramValue = () => {};

          // Act
          validate(paramValue).integer();
        } catch (err) {
          // Assert
          expect(err.message).toBe(`'parameter' must be a integer`);
        }
      });
      it('when param is undefined, no error is throw', () => {
        try {
          //Arrange
          let paramValue = undefined;

          // Act
          validate(paramValue).integer();
        } catch (err) {
          // Assert
          expect('should not reach this point').toBeUndefined();
        }
      });
      it('when param is undefined, no error is throw', () => {
        try {
          //Arrange
          let paramValue = undefined;

          // Act
          validate(paramValue).number().integer();
        } catch (err) {
          // Assert
          expect('should not reach this point').toBeUndefined();
        }
      });
    });
  });
  describe('> validate().required()', () => {
    // ...
  });
});
