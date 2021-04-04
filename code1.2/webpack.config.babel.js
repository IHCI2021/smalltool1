var cssnext = require('postcss-cssnext');
var postcssFocus = require('postcss-focus');
var postcssReporter = require('postcss-reporter');
var path = require('path');
var cssModulesIdentName = '[name]__[local]__[hash:base64:5]';
if (process.env.NODE_ENV === 'production') {
  cssModulesIdentName = '[hash:base64]';
}

module.exports = {
  output: {
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'client',
      'node_modules',
    ],

  },
  module: {
    rules: [

      {
        test: /\.css$/,
        exclude: /node_modules/,
        // include: path.join(__dirname, '/node_modules/antd'),
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              localIdentName: cssModulesIdentName,
              modules: true,
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                postcssFocus(),
                cssnext({
                  browsers: ['last 2 versions', 'IE > 10'],
                }),
                postcssReporter({
                  clearMessages: true,
                }),
              ],
            },
          },
        ],
      },
      // {
      //   test: /\.css$/,
      //   include: /node_modules/,
      //   use: ['style-loader', 'css-loader'],
      // },
      // {
      //   test: /\.less$/,
      //   use: [{
      //       loader: 'style-loader' // creates style nodes from JS strings
      //     },
      //   {
      //       loader: 'css-loader' // translates CSS into CommonJ
      //   },
      //   {
      //       loader: 'less-loader', // compiles Less to CSS
      //       options: {
      //           javascriptEnabled: true
      //        }
      //       }]
      // },
      {
        test: /\.(css|less)$/,
        include: /node_modules/,
        use: [{
            loader: 'style-loader' // creates style nodes from JS strings
          },
        {
            loader: 'css-loader' // translates CSS into CommonJ
        },
        {
            loader: 'less-loader', // compiles Less to CSS
            options: {
                javascriptEnabled: true,
                sourceMap: true,
             }
            }]
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
            },
          },
        ],
      },
    ],
  },
};
