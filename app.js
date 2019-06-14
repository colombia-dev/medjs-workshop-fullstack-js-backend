/**
 * Main application file
 */

const express = require('express');
const http = require('http');

// Setup server
const app = express();
const server = http.createServer(app);

const config = {
  port: 8080,
  ip: '127.0.0.1',
};

// Start server
function startServer() {
  app.shoppingCartBK = server.listen(config.port, config.ip, () => {
    console.log(`Express server listening on ${config.port}, in ${app.get('env')} mode`);
  });
}

setImmediate(startServer);

// Expose app
module.exports = app;
