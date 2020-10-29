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
        const currentClientId = req.session.clientId;
        const currentClientRole = req.session.role;

        if (
          solicitedClientId !== currentClientId &&
          currentClientRole !== 'admin'
        )
          return res.status(403).json({ message: 'Forbidden' }).end();

        const clientId =
          currentClientRole === 'admin' ? solicitedClientId : currentClientId;

        const { item } = await _Clients.findOneBy('id', clientId);
        if (!item) return res.status(404).json({ messag: 'Not Found' }).end();

        res.status(200).json(item).end();
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
        const currentClientId = req.session.clientId;
        const currentClientRole = req.session.role;
        const { limit = 10, page = 1, name } = req.query;
        const { items } = await _Clients.findMany({
          limit,
          page,
          name,
          id: currentClientRole !== 'admin' ? currentClientId : undefined,
        });
        res.status(200).json(items);
      } catch (err) {
        next(err);
      }
    },
  };
};
