 const path = require('path');

// webpack.config.js
module.exports = {
  entry: [
    './connect_src/connect_source.js'
  ],
  output: {
    filename: 'connect_dist.js',
    path: path.resolve(__dirname, 'page'),
    library: 'connectors',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify")
    }
  }
}
