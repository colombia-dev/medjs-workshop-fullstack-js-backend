/**
 * Main application routes
 * @author: Cristian Moreno Zuluaga <khriztianmoreno@gmail.com>
 */

// Import Endpoints
const helloWorld = require('./api/helloworld');
const product = require('./api/product');
const user = require('./api/user');
// New line
const auth = require('./auth');

module.exports = (app) => {
  app.use('/api/helloworld', helloWorld);
  app.use('/api/products', product);
  app.use('/api/users', user);

  // New line
  app.use('/auth', auth);
};
