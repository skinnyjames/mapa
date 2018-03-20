var nodeExternals = require('webpack-node-externals');

module.exports = {
  webpack: {
    target: 'web',
    resolve: {
      alias: {vue$: 'vue/dist/vue.esm.js'}
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [  
            {
              loader: 'babel-loader',
              options: {
                presets: ['env', ['es2015', {modules: false}] ]
              },
            }
          ]
        },
      ],
    },
    externals: [
   //   nodeExternals(),
      //{'leaflet': 'L'},
      //{'leaflet.markercluster': {root: ['leaflet', 'markercluster']}}
    ]
  }
}
