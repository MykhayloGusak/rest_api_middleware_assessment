const { validate } = require('../Utils/validate');

/**
 * Policies module (factory function)
 *
 * @param {Object} options
 * @param {Object} options.dataAccess - Data Access Layer
 * @return {{
 *  login: (req,res,next),
 *  check: (req,res,next),
 *  accessToken:{
 *    get: (),
 *    refresh: (),
 *  }
 * }}
 */
module.exports.OAuth2 = ({ cache, expiresIn }) => {
  const session = cache;
  let axaToken;
  let expiringDate;
  let expiringTime = expiresIn ? expiresIn : 2 * 60;
  const accessSecret = process.env.SECRET_ACCESS || 'test'
  const refreshSecret = process.env.SECRET_REFRESH || 'testRefresh'
  // {
  //   username: string,
  //   accessToken: string,
  //   refreshToken: string,
  //   resourceToken: string
  // }




  const _recourceLogin =  (password) => new Promise(async(resolve,reject)=> {
    try {
      const { data } = await axios.post(
        'https://dare-nodejs-assessment.herokuapp.com/api/login',
        {
          client_id: 'axa',
          client_secret: password, //  's3cr3t'
        }
      );

      axaToken = data.token;
      expiringDate = new Data(Date.now() + 1000 * 60 * 10);

      return data.token;
    } catch (err) {
      debugger;
    }
  })

  const _getValidAxaToken = () =>
    new Promise(async (resolve, reject) => {
      try {
        const timeNow = Date.now();

        if (!axaToken || expiringDate - timeNow < 1000 * 5)
          await _refreshAxaToken();

        resolve(axaToken);
      } catch (err) {
        reject(err);
      }
    });

  const _resourceUserByName =  (name, token) => new Promise(async(resolve,reject)=>{
    try {
      const { data: usersList } = await axios.get(
        'https://dare-nodejs-assessment.herokuapp.com/api/clients',
        {
          headers: {
            authorization: 'Bearer ' + token,
          },
        }
      );

      const currentUser = usersList.find((singleUser) => {
        singleUser.name === name;
      });

      if (!currentUser) return null;

      return resolve(currentUser);
    } catch (err) {
      reject(err);
    }
  });

  const _generateAccessToken = (data) =>  jwt.sign(data, secret, { expiresIn: expiringTime }),
  


  const _accessToken = {
    generate: (scope) => jwt.sign(scope, accessSecret, { expiresIn: expiringTime }),

  };

  const _refreshToken = {
    generate: (scope) => jwt.sign(scope, refreshSecret, { expiresIn: expiringTime }),
  };

  const _resourceToken = {
    generate: (scope) => jwt.sign(scope, refreshSecret, { expiresIn: expiringTime }),
  };

  return {
    login: async (req, res) => {
      try {
        const { username, password } = req.body;

        validate(username).required().string();
        validate(password).required().string();

        const token = await _recourceLogin(password)

        const currentUser = await _resourceUserByName(username, token);

        if (!currentUser)
          return res
            .status(401)
            .json({ message: 'Internal Server Error', code: '213' })
            .end();

        const accessToken = _accessToken.generate(currentUser); 
        const refreshToken = _refreshToken.generate(currentUser); 

        return res.status(200).json({
          accessToken: accessToken,
          expires_in: expiringTime,
          refreshToken: refreshToken
        });

 
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
