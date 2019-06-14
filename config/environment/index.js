/**
 * Default specific configuration
 * @author: Cristian Moreno Zulauaga <khriztianmoreno@gmail.com>
 */

const all = {
  env: process.env.NODE_ENV,

  // Server port
  port: process.env.PORT || 8080,

  // Server IP
  ip: process.env.IP || '127.0.0.1',

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'w0rksh0p-full5tack-j4v45cr1pt',
  },

  // MongoDB connection options
  mongo: {
    uri: process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@cluster0-ddb2f.mongodb.net/<database>?retryWrites=true&w=majority',
    db: 'workshop-fullstack-js',
  },
};

module.exports = all;
