/**
 * Cache mechanism
 *
 * @param {number} expiresIn OPTIONAL -  Period of time in seconds in which a cached item inspires (Default: 30 sec)
 * @param {number} maxItems OPTIONAL - Maximum number of cached items (Default: 5 items)
 * @return {object}
 */

module.exports.Cache = ({ expiresIn, maxItems }) => {
  const cached = [];

  if (expiresIn && !Number.isInteger(expiresIn))
    throw Error('"expiresIn" must be a number');
  if (maxItems && !Number.isInteger(maxItems))
    throw Error('"maxItems" must be a number');

  const cachedExpiresIn = expiresIn ? expiresIn * 1000 : 30 * 1000;
  const cachedItemsLimit = maxItems ? maxItems : 5;

  const _findCacheByKey = (key) => {
    let cache = undefined;

    if (key) {
      let index = cached.findIndex((cachedItem) => cachedItem.key === key);
      if (index > -1) cache = cached[index];
    } else {
    }

    return cache;
  };

  const _saveCacheByKey = (key, value) => {
    const timeNow = Date.now();

    let index = cached.findIndex((cachedItem) => cachedItem.key === key);

    if (index > -1) {
      cached[index].value = value;
      cached[index].date = timeNow;
    } else {
      const newItemToCache = {
        date: timeNow,
        value: value,
        key: key,
      };

      cached.push(newItemToCache);
    }

    return undefined;
  };

  const _deleteCacheByKey = (key) => {
    let index = cached.findIndex((cachedItem) => cachedItem.key === key);

    if (index > -1) cached.splice(index, 1);

    return undefined;
  };

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
        // validate inputs

        if (cached.length >= cachedItemsLimit) return null;

        _saveCacheByKey(keyName, keyValue);

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

        const foundCachedItem = _findCacheByKey(keyName);

        if (!foundCachedItem) return null;

        const { value, date: cachedTime } = foundCachedItem;

        let timeNow = Date.now();

        if (timeNow - cachedTime < cachedExpiresIn) return value;

        _deleteCacheByKey(keyName);

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

        const foundCachedItem = _findCacheByKey(keyName);

        if (!foundCachedItem) return undefined;

        _deleteCacheByKey(keyName);

        return undefined;
      } catch (err) {
        throw err;
      }
    },
  };
};
