const Path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: Path.resolve(__dirname, '../src/scripts/index.js'),
    about: Path.resolve(__dirname, '../src/scripts/about.js'),
    projects: Path.resolve(__dirname, '../src/scripts/projects.js'),
    contacts: Path.resolve(__dirname, '../src/scripts/contacts.js'),
  },
  output: {
    path: Path.join(__dirname, '../build'),
    filename: 'js/[name].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({ patterns: [{ from: Path.resolve(__dirname, '../public'), to: 'public' }] }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/about/index.html',
      inject: true,
      chunks: ['about'],
      filename: 'about/index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/projects/index.html',
      inject: true,
      chunks: ['projects'],
      filename: 'projects/index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/contacts/index.html',
      inject: true,
      chunks: ['contacts'],
      filename: 'contacts/index.html'
    }),
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
    ],
  },
};
