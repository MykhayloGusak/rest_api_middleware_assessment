/**
 * Cache mechanism
 *
 * @param {number} expiresIn OPTIONAL -  Period of time in seconds in which a cached item inspires (Default: 30 sec)
 * @param {number} maxItems OPTIONAL - Maximum number of cached items (Default: 5 items)
 * @return {object}
 */

module.exports.Cache = () => {
  const cached = [];
  // validate input params

  return {
    /**
     * When passed a key name and value, will add that key to the storage, or update that key's value if it already exists.
     *
     * @param {string} keyName - The name of the key you want to create/update.
     * @param {any} keyValue - The value you want to give the key you are creating/updating.
     * @return {undefined}
     */
    setItem: (keyName, keyValue) => {
      try {
        // validate input

        // get item by key, if not exists return undefiend, if existis return item
        return undefined;
      } catch (err) {
        throw err;
      }
    },
    /**
     * When passed a key name, will return that key's value.
     *
     * @param {string} keyName - The name of the key you want to retrieve the value of.
     * @return {any} The value of the key. If the key does not exist, null is returned.
     * @throws {Error} - "keyName" parameter must be defined
     */
    getItem: (keyName) => {
      try {
        // validate input

        // return cached item

        // if cache with provided key is not found, return undefuned

        return null;
      } catch (err) {
        throw err;
      }
    },
    /**
     * When passed a key name, will remove that key from the storage.
     *
     * @param {string} keyName - The name of the key you want to remove.
     * @return {undefined}
     * @throws {Error} - "keyName" parameter must be defined
     *
     */
    removeItem: (keyName) => {
      try {
        // validate input

        // find item, if not exists return null

        // delete item

        return undefined;
      } catch (err) {
        throw err;
      }
    },
  };
};
