import fs from 'fs';
import path from 'path';
import webpack from 'webpack';

export const rootPath = path.resolve(__dirname, '..');
export const srcPath = path.resolve(rootPath, 'src');
export const distPath = path.resolve(rootPath, 'dist');
const dataPath = path.resolve(rootPath, 'data');

export const env = process.env.NODE_ENV === 'development' ? 'development' : 'production';

const envPath = path.resolve(__dirname, '../.env');

export const config: webpack.Configuration = {
  devtool: false,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '~': srcPath,
      '~/client': path.resolve(srcPath, 'client'),
      '~/server': path.resolve(srcPath, 'server'),
      '~/shared': path.resolve(srcPath, 'shared'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      __dev: process.env.NODE_ENV === 'development',
      __test: process.env.NODE_ENV === 'test',
      __env: (() => {
        if (process.env.TRAVIS === 'true') {
          return {
            database_user: 'root',
            database_password: 'test',
            database_name: 'test',
          };
        }

        const data = fs.readFileSync(envPath);

        return JSON.stringify(
          data
            .toString()
            .trim()
            .split('\n')
            .map((e) => {
              const t = e.split('=');
              return {
                [t[0]]: t[1],
              };
            })
            .reduce((a, b) => ({ ...a, ...b }))
        );
      })(),
      __path: JSON.stringify({
        root: rootPath,
        src: srcPath,
        dist: distPath,
        data: dataPath,
      }),
    }),
    new webpack.ProgressPlugin(),
  ],
  mode: env,
};
