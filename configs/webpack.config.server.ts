import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import { config, distPath, env, srcPath } from '../configs/webpack.config.base';

const serverConfig: webpack.Configuration = {
  ...config,
  entry: path.resolve(srcPath, 'server', 'index.ts'),
  output: {
    path: distPath,
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
      },
    ],
  },
  plugins: [
    ...(config.plugins ?? []),
    ...(() => {
      if (env === 'production') {
        return [
          new webpack.LoaderOptionsPlugin({
            minimize: true,
          }),
        ];
      }
      return [];
    })(),
  ],
  target: 'node',
  node: {
    __dirname: true,
  },
  externals: [nodeExternals()],
};

export default serverConfig;
