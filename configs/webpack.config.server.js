const path = require('path');

const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const { baseConfig, srcPath, distPath, env } = require('../configs/webpack.config.base');

module.exports = {
  ...baseConfig,
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
    ...baseConfig.plugins,
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
