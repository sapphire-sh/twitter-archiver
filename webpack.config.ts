import webpack from 'webpack';
import clientConfig from './configs/webpack.config.client';
import serverConfig from './configs/webpack.config.server';

const getConfig = (): webpack.Configuration => {
  switch (process.env.TARGET) {
    case 'server': {
      return serverConfig;
    }
    case 'client':
    default: {
      return clientConfig;
    }
  }
};

export default getConfig();
