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
        const solicitedClientId = req.params.clientId;
        const currentClientId = req.scope.clientId;

        const currentClientRole = req.scope.role;

        if (
          solicitedClientId !== currentClientId &&
          currentClientRole !== 'admin'
        )
          return res.status(403);

        const { item } = await _Clients.findOne(clientId);

        res.status(200).json(item);
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
        const currentClientId = req.scope.clientId;
        const currentClientRole = req.scope.role;
        const { limit = 10, page = 1, name } = req.query;

        const { items } = await _Clients.findMany({
          limit,
          page,
          name,
          clientId: currentClientRole !== 'admin' ? currentClientId : undefined,
        });

        res.status(200).json(items);
      } catch (err) {
        next(err);
      }
    },
  };
};
