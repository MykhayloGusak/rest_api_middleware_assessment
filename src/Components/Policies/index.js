const { validate } = require('../../Utils/validate');

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
        const { role, clientId } = req.session;
        const { item } = await _Policies.findOneBy('id', solicitedPolicyId);
        if (!item && role === 'admin') {
          return res.status(404).json({ code: 404, message: 'Not Found' });
        } else if (!item) {
          return res.status(403).json({ code: 403, message: 'Forbidden' });
        }

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
        validate(req.query.page, 'page').integer();
        validate(req.query.limit, 'limit').integer();

        const currentClientId = req.session.clientId;
        const currentClientRole = req.session.role;
        const page = req.query.page ? +req.query.page : 1;
        const limit = req.query.limit ? +req.query.limit : 10;

        const { items } = await _Policies.findMany({
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
        const currentClientId = req.session.clientId;
        const currentClientRole = req.session.role;
        const solicitedClientId = req.params.clientId;

        const page = req.query.page ? +req.query.page : 1;
        const limit = req.query.limit ? +req.query.limit : 10;

        if (
          currentClientId !== solicitedClientId &&
          currentClientRole !== 'admin'
        )
          return res.status(403).json({ code: 403, message: 'Forbidden' });
        const { items } = await _Policies.findMany({
          page,
          limit,
          clientId:
            currentClientRole === 'admin' ? solicitedClientId : currentClientId,
        });

        res.status(200).json(items).end();
      } catch (err) {
        next(err);
      }
    },
  };
};
