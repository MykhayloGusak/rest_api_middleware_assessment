const axios = require('axios');
const { validate } = require('../Utils/validate');
require('dotenv').config();

/**
 * Data Access module (factory function)
 *
 * @param {Object} options
 * @param {string} options.uri - Url resource
 * @param {Object} options.caching - Cahcing module
 * @param {Object} options.Auth - Auth module
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
module.exports.DataAccess = ({ uri, cache, authorization }) => {
  const cacheed = cache;
  const auth = authorization;
  const cacheKey = Math.random().toString(36).substr(2, 9);

  const _getItems = () =>
    new Promise(async (resolve, reject) => {
      try {
        const cachedItem = cacheed.getItem(cacheKey);
        const { token } = await auth.resourceToken.get();

        const requestHeaders = {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        };

        if (cachedItem)
          requestHeaders.headers['If-None-Match'] = cachedItem.etag;

        let response;
        for (let i = 1, limit = 2; i <= limit; i++) {
          try {
            if (i === 2) {
              const newToken = await auth.resourceToken.refresh();
              requestHeaders.authorization = `Bearer ${newToken.token}`;
            }
            response = await axios.get(uri, requestHeaders);
            break;
          } catch (err) {
            if (err.response.status === 304 && cachedItem?.data) {
              response = {
                data: cachedItem.data,
                headers: { etag: cachedItem.etag },
              };
              break;
            } else if (i > 1) {
              return reject(err);
            }
          }
        }
        const { headers, data } = response;

        if (
          (!cachedItem && headers.etag) ||
          (cachedItem && cachedItem?.etag !== headers?.etag)
        )
          cacheed.setItem(cacheKey, { etag: headers.etag, data: data });

        return resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  return {
    /**
     * Get one entity by id
     *
     * @param {string} paramName - Filter by field "id"
     * @param {number} value - Value to be equal
     * @return {object} - Requested entity
     */
    findOneBy: (paramName, value) =>
      new Promise(async (resolve, reject) => {
        try {
          validate(value).required().string();
          validate(paramName).required().string();

          entityList = await _getItems();

          const entity = entityList.find(
            (entity) => entity[paramName] === value
          );

          if (!entity) return resolve({ item: null });

          return resolve({ item: entity });
        } catch (err) {
          reject(err);
        }
      }),
    /**
     * Find many entities
     *
     * @param {object} options
     * @param {number} options.page - Page number
     * @param {number} options.limit - Limit of pages per request
     * @param {number} options.id - Filter by field "id"
     * @param {number} options.clientId - Filter by field "clientId"
     * @return {{ items: array }} - List of entities
     */
    findMany: ({ page, limit, name, id, clientId }) =>
      new Promise(async (resolve, reject) => {
        try {
          validate(page, 'page').integer();
          validate(limit, 'limit').integer();
          validate(name, 'name').string();
          validate(clientId, 'clientId').string();
          validate(id, 'id').string();

          items = await _getItems();
          if (!items) return resolve({ items: null });

          const filters = [];
          if (name && typeof name === 'string')
            filters.push((obj) => obj.name === name);

          if (clientId && typeof clientId === 'string')
            filters.push((obj) => obj.clientId === clientId);

          if (id && typeof id === 'string')
            filters.push((obj) => obj.id === id);

          let filteredAndPaginatedItems = items.filter((testedItem) => {
            if (filters.every((filter) => filter(testedItem)))
              return testedItem;
          });

          if (page && limit)
            filteredAndPaginatedItems = filteredAndPaginatedItems.splice(
              (page - 1) * limit,
              limit
            );
          resolve({ items: filteredAndPaginatedItems });
        } catch (err) {
          reject(err);
        }
      }),
  };
};
