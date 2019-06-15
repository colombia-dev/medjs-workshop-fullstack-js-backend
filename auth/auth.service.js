/**
 * Auth Middleware
 */

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const compose = require('composable-middleware');

const User = require('../api/user/user.model');

const config = {
  secrets: {
    session: 'w0rksh0p-full5tack-j4v45cr1pt',
  },
  userRoles: ['admin', 'manager', 'user'],
};

const validateJwt = expressJwt({
  secret: config.secrets.session,
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return compose()
    // Validate jwt
    .use((req, res, next) => {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = `Bearer ${req.query.access_token}`;
      }
      // IE11 forgets to set Authorization header sometimes. Pull from cookie instead.
      if (req.query && typeof req.headers.authorization === 'undefined' && req.cookies) {
        const { token } = req.cookies;
        req.headers.authorization = `Bearer ${token}`;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use((req, res, next) => {
      User.findById(req.user._id).exec()
        .then((user) => {
          if (!user) {
            return res.status(401).end();
          }
          req.user = user;
          next();
          return null;
        })
        .catch(err => next(err));
    });
}

/**
* Checks if the user role meets the minimum requirements of the route
*/
function hasRole(roleRequired) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use((req, res, next) => {
      if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
        return next();
      }
      return res.status(403).send('Forbidden');
    });
}

/**
* Returns a jwt token signed by the app secret
*/
function signToken(id, role) {
  return jwt.sign({ _id: id, role }, config.secrets.session, {
    expiresIn: 60 * 60 * 5,
  });
}

module.exports = {
  isAuthenticated,
  hasRole,
  signToken,
};
