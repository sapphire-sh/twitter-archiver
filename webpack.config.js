const clientConfig = require('./configs/webpack.config.client');
const serverConfig = require('./configs/webpack.config.server');

function getConfig() {
  switch (process.env.TARGET) {
    case 'server':
      return serverConfig;
    case 'client':
    default:
      return clientConfig;
  }
}

const config = getConfig();

module.exports = config;
