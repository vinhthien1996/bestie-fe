const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/embed/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'embed.js',
    library: {
      type: 'window',
      name: 'BestieEmbed',
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: "tsconfig.embed.json",
            transpileOnly: true
          }
        },
        exclude: /node_modules/,
      },
    ],
  },
}; 