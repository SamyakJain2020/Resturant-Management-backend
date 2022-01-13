var express = require('express');
var router = express.Router();
const { auth, requiresAuth  } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: '8Nzru6CeB64CyMfV2sujC6NtQ3fS3RPh',
  issuerBaseURL: 'https://dev-av060j14.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  res.render('index', { title: 'Express' });
});
router.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});
/* GET home page. */
// router.get('/', function(req, res, next) {
// });

module.exports = router;
