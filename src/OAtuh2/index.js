/**
 * Policies module (factory function)
 *
 * @param {Object} options
 * @param {Object} options.dataAccess - Data Access Layer
 * @return {{
 *  login: (req,res,next),
 *  check: (req,res,next),
 *  accessToken:{
 *    get: ()
 *  }
 * }}
 */
module.exports.OAuth2 = ({ cache }) => {
  const session = cache;
  // {
  //   username: string,
  //   accessToken: string,
  //   refreshToken: string,
  //   resourceToken: string
  // }
  return {
    login: async (req, res) => {
      try {
        const token = req.headers.authorization
          ? req.headers.authorization.split(' ')[1]
          : undefined;

        // 1. validate if token exists

        // 2. validate if token is correct

        // 3. check if role is defined

        // 4. if all is correct return token or if is not 401
      } catch (err) {
        res.status(500).json({ error: JSON.stringify(err) });
      }
    },
    check: async (req, res) => {
      try {
        const token = req.headers.authorization
          ? req.headers.authorization.split(' ')[1]
          : undefined;

        // 1. validate if token exists

        // 2. validate if token is correct

        // 3. check if role is defined

        // 3. if all is correct0
        next();
      } catch (err) {}
    },
    resourceToken: {
      get: () => {},
      refresh: () => {},
    },
    accessToken: {
      get: () => {},
      refresh: () => {},
    },
    refreshToken: {
      get: () => {},
      refresh: () => {},
    },
  };
};
