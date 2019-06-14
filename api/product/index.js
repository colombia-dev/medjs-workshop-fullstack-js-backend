/**
 * Product
 * @author: Cristian Moreno Zuluaga <khriztianmoreno@gmail.com>
 */

const { Router } = require('express');

const controller = require('./product.controller');

const router = new Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);

module.exports = router;
