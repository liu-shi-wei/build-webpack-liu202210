const merge = require('webpack-merge')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const htmlwebpackexternalsplugin=rquire('html-webpack-externals-plugin')

const baseConfig = require('./webpack.base')

const prodConfig = {
  mode: 'production',
  plugins:[
    //代码压缩(js默认压缩，下面的代码压缩css)
    new OptimizeCssAssetsPlugin({  
			assetNameRegExp:/\.css$/g,
			cssProcessor:require('cssnano')
    }),
    //提取公共页面
    new htmlwebpackexternalsplugin({
      externals:[
        {
          module:'react',
          entry:'//11.url.cn/now/lib/15.1.0/react-with-addons.min.js?_bid=3123',//指定该cdn上的react基础库，不把react基础库打包出去
          global:'React'
        },
        {
          module:'react',
          entry:'//11.url.cn/now/lib/15.1.0/reac-dom.min.js?_bid=3123',
          global:'ReactDOM'
        }
      ]
    }),
  ],
  //提取公共页面
  optimization:{
        splitChunks:{
            cacheGroups:{
                commons:{
                    test:/(react|react-dom)/,//将react react-dom基础库提取出来
                    name: 'vendors',//提取出来的文件名
                    chunks:'all'
                }
            }
        }
        },
}

module.exports = merge(baseConfig,prodConfig)