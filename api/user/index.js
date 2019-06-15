/**
 * User
 * @author: Cristian Moreno Zuluaga <khriztianmoreno@gmail.com>
 */

const { Router } = require('express');
const controller = require('./user.controller');

// New line
const auth = require('./../../auth/auth.service');


const router = new Router();

// New Line
router.get('/', auth.isAuthenticated(), controller.index);
router.post('/', controller.create);

module.exports = router;
