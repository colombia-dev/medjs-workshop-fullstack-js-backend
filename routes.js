/**
 * Main application routes
 * @author: Cristian Moreno Zuluaga <khriztianmoreno@gmail.com>
 */

// Import Endpoints
const helloWorld = require('./api/helloworld');
const product = require('./api/product');
// New line
const user = require('./api/user');

module.exports = (app) => {
  app.use('/api/helloworld', helloWorld);
  app.use('/api/products', product);
  // New line
  app.use('/api/users', user);
};
