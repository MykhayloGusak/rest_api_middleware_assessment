const router = require('express').Router();

// const { Clients } = require('../Components/Clients');
// const { Policies } = require('../Components/Policies');

// const { DataAccess } = require('../DataAccess');
// const { Cache } = require('../Cache');
const { OAuth2 } = require('../OAuth2');

const oauth2 = OAuth2({});
// const cache = Cache({
//   expiresIn: 30,
//   maxItems: 10,
// });

// const clients = Clients({
//   dataAccess: DataAccess({
//     url: process.env.AXA_URL_CLIENTS,
//     caching: cache,
//     Auth: oauth2,
//   }),
// });

// const policies = Policies({
//   dataAccess: DataAccess({
//     url: process.env.AXA_URL_POLICIES,
//     caching: cache,
//     Auth: oauth2,
//   }),
// });

router.post('/login', oauth2.login);

router.get('/clients', oauth2.check, clients.list);
// router.get('/clients/:clientId', oauth2.check, clients.getOneById);
// router.get('/clients/:clientId/policies', oauth2.check, policies.getOneById);

// router.get('/policies', oauth2.check, policies.list);
// router.get('/policies/:policyId', oauth2.check, policies.getOneById);

module.exports = router;
