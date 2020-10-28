const axios = require('axios');
const { validate } = require('../Utils/validate');

/**
 * Data Access module (factory function)
 *
 * @param {object} options
 * @param {string} options.uri - Url resource
 * @param {object} options.caching - Cahcing module
 * @param {object} options.Auth - Auth module
 * @return {{
 *  findOne: (id),
 *  findMany: ({
 *    page: number, 
 *    limit: number,
 *    name: string, 
 *    clientId: string
 *  }),
 * }}
 */
module.exports.DataAccess = ({ uri, caching, Auth }) => {
  const cache = caching;
  const auth = Auth;
  const cacheKey = Math.random().toString(36).substr(2, 9);

  const _queryFilters = {
    name: (obj) => obj.name === name,
    clientId: (obj) => obj.clientId === name,
  };

  const _getItems = () =>
    new Promise(async (resolve, reject) => {
      debugger;
      const cachedItem = cache.getItem(cacheKey);
      const axaToken = await auth.getToken();

      const requestHeaders = {
        authorization: `Bearer ${axaToken}`,
        'If-None-Match': cachedItem ? cachedItem.value.etag : undefined,
      };

      let response;

      for (let i = 1, limit = 2; i <= limit; i++) {
        try {
          response = await axios.get(uri, requestHeaders);
          break;
        } catch (err) {
          if (err.status === 403 && cachedItem) {
            response = cachedItem.value.data;
            break;
          } else if (i > 1) {
            return reject(err);
          }
        }
      }

      const { headers, data } = response;

      if (!cachedItem && headers.etag)
        cache.setItem(cacheKey, { etag: headers.etag, data: data });

      return resolve(response);
    });

  /**
   * ...
   *
   */
  findOne = (id) =>
    new Promise(async (resolve, reject) => {
      try {
        validate(id).required().string();

        entityList = await _getItems();

        const entity = entityList.find(
          (currentEntity) => currentEntity.id === id
        );

        if (!entity) return resolve(null);

        resolve(entity);
      } catch (err) {
        reject(err);
      }
    });
  /**
   * ...
   *
   */
  findMany = ({ page, limit, name, clientId }) =>
    new Promise(async (resolve, reject) => {
      try {
        validate(page).integer();
        validate(limit).integer();
        validate(id).string();
        validate(clientId).string();

        items = await _getItems();
        if (!items) return resolve(null);

        if (name && typeof name === 'string') filters.push(_queryFilters.name);
        if (clientId && typeof name === 'string')
          filters.push(_queryFilters.clientId);

        const filteredAndPaginatedItems = items
          .filter((testedItem) => {
            if (filters.every((filter) => filter(testedItem)))
              return testedItem;
          })
          .splice((page - 1) * limit, limit);

        resolve({ items: filteredAndPaginatedItems });
      } catch (err) {
        reject(err);
      }
    });
};
