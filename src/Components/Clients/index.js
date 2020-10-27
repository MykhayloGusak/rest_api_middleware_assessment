/**
 * Users module (factory function)
 *
 * @param {Objects} options
 * @param {Function} options.dataAccess - Data Acces Leyer
 *
 * @return {{
 *  getOneById: (req, res, next),
 *  list:(req, res, next)
 * }}
 *
 *
 */
module.exports.Clients = ({ dataAccess }) => {
  const _Clients = dataAccess;

  return {
    /**
     * Get one user by id (middleware)
     *
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     * @return {undefined}
     */
    getOneById: async (req, res, next) => {
      try {
        // define params

        // check role

        // get Item

        // response to client
        res.status(200).json();
      } catch (err) {
        next(err);
      }
    },
    /**
     * List users (middleware)
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

        // list items within query

        // responde to client
        res.status(200).json();
      } catch (err) {
        next(err);
      }
    },
  };
};
