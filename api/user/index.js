/**
 * User
 * @author: Cristian Moreno Zuluaga <khriztianmoreno@gmail.com>
 */

const { Router } = require('express');
const controller = require('./user.controller');

const router = new Router();

router.post('/', controller.create);

module.exports = router;
