var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'script-loader!jquery/dist/jquery.min.js',
    './app/app.jsx'
  ],
  externals: {
    jquery: 'jQuery',
    foundation: 'foundation-sites'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    })
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
    alias: {
      applicationStyle: 'app/styles/app.scss',
      AppNav: 'app/components/AppNav.jsx',
      Main: 'app/components/Main.jsx',
      Sort: 'app/components/Sort.jsx',
      BST: 'app/components/BST.jsx',
      App: 'app/components/App.jsx',
      AuthModal: 'app/components/AuthModal.jsx'
    },
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader'
          },
        ],
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.exec\.js$/,
        use: ['script-loader']
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map'
};
