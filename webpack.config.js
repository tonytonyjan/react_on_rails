const __PRODUCTION__ = process.env['NODE_ENV'] == 'production'
var webpack = require('webpack')
if(__PRODUCTION__){
  var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')
}

module.exports = {
  entry: {
    client: './app/assets/client.js',
    server: './app/assets/server.js'
  },
  output: {
    filename: __PRODUCTION__ ? '[name]-[hash].js' : '[name].js',
    path: __dirname + '/public/assets',
    publicPath: '/assets/'
  },
  resolve: {
    modules: [
      __dirname + '/app/assets/containers',
      __dirname + '/app/assets/components',
      __dirname + '/app/assets',
      'node_modules'
    ]
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  plugins: [
    function() {
      this.plugin('done', function(stats) {
        require('fs').writeFileSync(__dirname + '/stats.json', JSON.stringify(stats.toJson({
          source: false,
          chunks: false,
          modules: false,
          children: false
        })))
      })
    },
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: __PRODUCTION__ ? "'production'" : "'development'"
      }
    }),
    __PRODUCTION__ ? new UglifyJsPlugin() : _ => _
  ]
}
