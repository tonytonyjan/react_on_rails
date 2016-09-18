module.exports = {
  entry: {
    client: './app/assets/client.js',
    server: './app/assets/server.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/public/assets'
  },
  resolve: {
    modules: [
      __dirname + '/app/assets/components',
      __dirname + '/app/assets',
      'node_modules'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
}
