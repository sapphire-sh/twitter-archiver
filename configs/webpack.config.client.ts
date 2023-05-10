import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { config, distPath, env, srcPath } from '../configs/webpack.config.base';

export default {
  ...config,
  entry: path.resolve(srcPath, 'client', 'index.tsx'),
  output: {
    path: distPath,
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
      {
        test: /\.txt$/,
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /\.(ttf|eot|woff2?)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    ...(config.plugins ?? []),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    ...(() => {
      if (env === 'development') {
        return [new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()];
      }
      return [];
    })(),
    ...(() => {
      if (process.env.NODE_ENV === 'analyze') {
        return [new BundleAnalyzerPlugin()];
      }
      return [];
    })(),
  ],
  devServer: {
    contentBase: [distPath],
    watchContentBase: true,
    proxy: {
      '/api': {
        target: 'https://archive.sapphire.sh',
        secure: false,
        changeOrigin: true,
      },
      '/auth': {
        target: 'https://archive.sapphire.sh',
        secure: false,
        changeOrigin: true,
      },
      '/socket.io': {
        target: 'https://archive.sapphire.sh',
        secure: false,
        changeOrigin: true,
      },
    },
    host: 'localhost',
    port: 8016,
    hot: true,
    open: true,
  },
};
