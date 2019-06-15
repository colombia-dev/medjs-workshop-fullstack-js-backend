/**
 * Auth configuration
 * @author: Cristian Moreno Zulauaga <khriztianmoreno@gmail.com>
 */

const express = require('express');

const User = require('../api/user/user.model');
const authLocal = require('./local/passport');
const configPassportLocal = require('./local');

// Passport Configuration
authLocal.setup(User);

const router = express.Router();

router.use('/local', configPassportLocal);

module.exports = router;
