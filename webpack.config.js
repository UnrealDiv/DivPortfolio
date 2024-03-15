const path = require("path");

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'public'), // Serve static files from the 'public' directory
          },
      compress: true,
      port: 4000,
    }
}