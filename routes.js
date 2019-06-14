/**
 * Main application routes
 * @author: Cristian Moreno Zuluaga <khriztianmoreno@gmail.com>
 */

// Import Endpoints
const helloWorld = require('./api/helloworld');

module.exports = (app) => {
  // Insert routes below
  app.use('/api/helloworld', helloWorld);

  // Next routes
  // Endpoints in plural
  // app.use('/api/users', user);
  // app.use('/api/products', product);
};
