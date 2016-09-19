module.exports = {
  entry: {
    client: './app/assets/client.js',
    server: './app/assets/server.js'
  },
  output: {
    filename: '[name].js',
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
    }
  ]
}
