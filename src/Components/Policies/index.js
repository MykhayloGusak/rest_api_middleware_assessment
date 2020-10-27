/**
 * Policies module (factory function)
 *
 * @param {Object} options
 * @param {Object} options.dataAccess - Data Access Layer
 * @return {{
 *  getOneById: (req,res,next),
 *  list: (req,res,next),
 *  listByClientId: (req,res,next),
 * }}
 */
module.exports.Policies = ({ dataAccess }) => {
  const _Policies = dataAccess;

  return {
    /**
     * Get one policy by id (middleware)
     *
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     * @return {undefined}
     */
    getOneById: async (req, res, next) => {
      try {
        // define params
        // check roles
        // responde to the clinet
      } catch (err) {
        next(err);
      }
    },
    /**
     * List policies (middleware)
     *
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     * @return {undefined}
     */
    list: async (req, res, next) => {
      try {
        // define params
        // define queries
        // check roles
        // responde to the clinet
      } catch (err) {
        next(err);
      }
    },
    /**
     * List policies by clientId (middleware)
     *
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     * @return {undefined}
     */
    listByClientId: async (req, res, next) => {
      try {
        // define params
        // define queries
        // check roles
        // responde to the clinet
      } catch (err) {
        next(err);
      }
    },
  };
};
