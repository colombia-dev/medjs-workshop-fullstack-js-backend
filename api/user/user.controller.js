const jwt = require('jsonwebtoken');

const User = require('./user.model');
const config = require('../../config/environment');

function validationError(res, statusCode) {
  const statusCodeLocal = statusCode || 422;
  return err => res.status(statusCodeLocal).json(err);
}

function handleError(res, statusCode) {
  const statusCodeLocal = statusCode || 500;
  return err => res.status(statusCodeLocal).send(err);
}

/**
 * Get list of users
 * restriction: 'admin'
 */
function index(req, res) {
  return User.find({}, '-salt -password').exec()
    .then(users => res.status(200).json(users))
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
function create(req, res) {
  const newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';

  return newUser.save()
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        config.secrets.session,
        { expiresIn: 60 * 60 * 5 },
      );
      res.json({ token });
    })
    .catch(validationError(res));
}

module.exports = {
  index,
  create,
};
