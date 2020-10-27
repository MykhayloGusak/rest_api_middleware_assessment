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
        const solicitedPolicyId = req.params.policyId;
        const { role, clientId } = req.scope;

        const { item } = await data.findOne(solicitedPolicyId);

        if (item.clientId !== clientId && role !== 'admin')
          return res.status(403).json({ code: 403, message: 'Forbidden' });

        return res.status(200).json(item).end();
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
        const currentClientId = req.scope.clientId;
        const currentClientRole = req.scope.role;
        const { page = 1, limit = 10 } = req.query;

        const { items } = await data.findMany({
          page,
          limit,
          clientId: currentClientRole !== 'admin' ? currentClientId : undefined,
        });

        res.status(200).json(items).end();
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
        const currentClientId = req.scope.clientId;
        const currentClientRole = req.scope.role;
        const solicitedClientId = req.path.clientId;

        if (
          currentClientId !== solicitedClientId &&
          currentClientRole !== 'admin'
        )
          return res.status(403).json({ code: 403, message: 'Forbidden' });

        const { items } = await data.findMany({
          clientId: solicitedClientId,
        });

        res.status(200).json(items).end();
      } catch (err) {
        next(err);
      }
    },
  };
};
