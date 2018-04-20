var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'script-loader!jquery/dist/jquery.min.js',
    './app/index.jsx'
  ],
  externals: {
    jquery: 'jQuery',
    foundation: 'foundation-sites'
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    })
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js',
    publicPath: '/'
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
      AuthModal: 'app/components/AuthModal.jsx',
      Intro: 'app/components/Intro.jsx',
      Home: 'app/components/Home.jsx',
      SideNav: 'app/components/SideNav.jsx',
      ExpandedGroup: 'app/components/ExpandedGroup.jsx',
      Course: 'app/components/Course.jsx',
      SubLesson: 'app/components/SubLesson.jsx',
      Content: 'app/components/Content.jsx',
      SortRoute: 'app/components/SortRoute.jsx',
      SideNavSub: 'app/components/SideNavSub.jsx'
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
  devServer: {
    historyApiFallback: true
  }
};
