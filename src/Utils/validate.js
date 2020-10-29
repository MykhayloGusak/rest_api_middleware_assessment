/**
 * Method determines whether the passed value of type string.
 *
 * @param {string} paramName - The name of the value that is tested.
 * @param {any} paramValue - The value to be tested for being an integer.
 *
 * @return {{
 *   string: (),
 *   number: (),
 *   integer: (),
 *   required: ()
 * }}
 * @throws {Error} - "paramName" must be a string
 * @throws {Error} - "paramName" must be a number
 * @throws {Error} - "paramName" must be a integer
 * @throws {Error} - "paramName" is required
 *
 */
module.exports.validate = (paramValue, paramName = 'parameter') => {
  const generalReturn = {
    string: () => _isString(),
    number: () => _isNumber(),
    integer: () => _isInteger(),
    required: () => _isRequired(),
  };

  const _isRequired = () => {
    if (!paramValue) throw new Error(`'${paramName}' is required`);
    return generalReturn;
  };

  const _isString = () => {
    if (paramValue && typeof paramValue !== 'string')
      throw new Error(`'${paramName}' must be a string`);
    return generalReturn;
  };

  const _isNumber = () => {
    if (paramValue && typeof paramValue !== 'number')
      throw new Error(`'${paramName}' must be a number`);
    return generalReturn;
  };

  const _isInteger = () => {
    if (paramValue && !Number.isInteger(+paramValue))
      throw new Error(`'${paramName}' must be a integer`);
    return generalReturn;
  };

  return generalReturn;
};
