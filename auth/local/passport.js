/**
 * Auth Local passport configuration
 */

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

function localAuthenticate(User, email, password, done) {
  User.findOne({ email: email.toLowerCase() }).exec()
    .then((user) => {
      if (!user) {
        return done(null, false, {
          message: 'This email is not registered.',
        });
      }
      return user.authenticate(password, (authError, authenticated) => {
        if (authError) {
          return done(authError);
        }
        if (!authenticated) {
          return done(null, false, { message: 'This password is not correct.' });
        }
        return done(null, user);
      });
    })
    .catch(err => done(err));
}

function setup(User) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password', // this is the virtual field on the model
  }, (email, password, done) => localAuthenticate(User, email, password, done)));
}

module.exports = { setup };
