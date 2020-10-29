const { validate } = require('../Utils/validate');
const jwt = require('jsonwebtoken');
const axios = require('axios');
require('dotenv').config();
const config = require('config');

/**
 * OAuth2 module (factory function)
 *
 * @param {Object} options
 * @param {Object} options.dataAccess - Data Access Layer
 * @return {{
 *  login: (req,res,next),
 *  check: (req,res,next),
 *  resourceToken:{
 *    get: ()
 *  }
 * }}
 */
module.exports.OAuth2 = ({ accessTokenExpiresIn }) => {
  let axaToken;
  let expiringDate;
  const tokenType = 'Bearer';
  const resourceTokenTimeExpiration = 1000 * 60 * 10;

  const expiringAccessTokenTime = accessTokenExpiresIn || 10 * 60;
  const accessSecret = process.env.SECRET_ACCESS || 'secretAccess';
  const generalClientPassword = process.env.CLIENT_GENERAL_PASSWORD || '123';
  const loginUri = config.uri.axa_login;
  const clientsUri = config.uri.axa_clients;

  const _recourceLogin = () =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.post(loginUri, {
          client_id: process.env.AXA_CLIENT_ID,
          client_secret: process.env.AXA_CLIENT_SECRET,
        });

        let expires_in = new Date(Date.now() + 1000 * 60 * 10);

        resolve({ token: data.token, expires_in });
      } catch (err) {
        reject(err);
      }
    });

  const _resourceUserByName = (name) =>
    new Promise(async (resolve, reject) => {
      try {
        const { token } = await _getResourceToken();
        const { data: usersList } = await axios.get(clientsUri, {
          headers: {
            authorization: 'Bearer ' + token,
          },
        });

        const currentUser = usersList.find(
          (singleUser) => singleUser.name === name
        );

        if (!currentUser) return null;

        return resolve(currentUser);
      } catch (err) {
        reject(err);
      }
    });

  const _generateAccessToken = (scope) =>
    jwt.sign(scope, accessSecret, { expiresIn: expiringAccessTokenTime });

  const _generateResourceToken = () =>
    new Promise(async (resolve, reject) => {
      try {
        const { token, expires_in } = await _recourceLogin();

        axaToken = token;
        expiringDate = expires_in;

        resolve({ token: token, expires_in: expires_in });
      } catch (err) {
        reject(err);
      }
    });

  const _getResourceToken = () =>
    new Promise(async (resolve, reject) => {
      try {
        const timeNow = Date.now();
        if (axaToken && expiringDate - timeNow < resourceTokenTimeExpiration) {
          return resolve({
            token: axaToken,
            expires_in: expiringDate,
          });
        } else {
          const newResourceToken = await _generateResourceToken();

          return resolve({
            token: newResourceToken.token,
            expires_in: newResourceToken.expires_in,
          });
        }
      } catch (err) {
        reject(err);
      }
    });

  return {
    login: async (req, res, next) => {
      try {
        const { username, password } = req.body;

        validate(username).required().string();
        validate(password).required().string();

        const currentUser = await _resourceUserByName(username);

        if (!currentUser || generalClientPassword !== password)
          return res
            .status(401)
            .json({ message: 'Unauthorized', code: 401 })
            .end();
        const accessToken = _generateAccessToken(currentUser);
        return res
          .status(200)
          .json({
            token: accessToken,
            expires_in: expiringAccessTokenTime,
            type: tokenType,
          })
          .end();
      } catch (err) {
        next(err);
      }
    },
    check: async (req, res, next) => {
      try {
        const accessToken = req.headers.authorization
          ? req.headers.authorization.split(' ')[1]
          : undefined;

        if (!accessToken)
          return res.status(401).json({ message: 'Unauthorized' }).end();

        const scope = jwt.verify(accessToken, accessSecret);

        if (!scope.role || !scope.id)
          return res.status(403).json({ message: 'Forbidden' }).end();

        const session = {
          clientId: scope.id,
          role: scope.role,
        };

        req.session = session;

        next();
      } catch (err) {
        next(err);
      }
    },
    resourceToken: {
      get: () =>
        new Promise(async (resolve, reject) => {
          try {
            const resourceToken = await _getResourceToken();

            resolve(resourceToken);
          } catch (err) {
            reject(err);
          }
        }),
      refresh: () =>
        new Promise(async (resolve, reject) => {
          try {
            const resourceToken = await _generateResourceToken();

            resolve(resourceToken);
          } catch (err) {
            reject(err);
          }
        }),
    },
  };
};
