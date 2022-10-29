const merge = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.base')
const devConfig = {
  mode:'development',
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    
],
devServer: {
    contentBase: './dist',
    hot: true
},
devtool:'source-map'
}

module.exports = merge(baseConfig,devConfig)