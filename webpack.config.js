module.exports = {
    mode: 'development',
    entry: './src/content.js', 
    output: {
      filename: 'bundle.js', 
      path: __dirname + '/dist' 
    },
    resolve: {
      fallback: {
          os: require.resolve('os-browserify/browser'),
          // To fix issues related to how Node handles certain modules
          "fs": false,
          "tls": false,
          "net": false,
          "path": false,
          "zlib": false,
          "http": false,
          "https": false,
          "stream": false,
          "crypto": false 
      } 
    }
};