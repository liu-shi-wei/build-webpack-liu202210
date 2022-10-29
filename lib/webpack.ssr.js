'use strict';

const path = require('path');
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const glob = require('glob')
const setMPA = () => {
    const entry= {};
    const htmlWebpackPlugins =[];
    // const entryFiles = glob.sync(path.join(__dirname,'src/index/index.js'));
    const entryFiles = glob.sync('./src/*/index-server.js');
    console.log('ff',entryFiles)
    Object.keys(entryFiles)
        .map((index) => {
            const entryFile = entryFiles[index]
            const match = entryFile.match(/src\/(.*)\/index-server\.js/);
            const pageName = match && match[1]
            if(pageName) {
              entry[pageName] = entryFile ;
              htmlWebpackPlugins.push(
                  new HtmlWebpackPlugin({  
                      template:path.join(__dirname,`src/${pageName}/index.html`),
                      filename:`${pageName}.html`,
                      chunks:['vendors',pageName],
                      inject:true,
                      minify:{
                          html5:true,
                          collapseWhitespace:true,
                          preserveLineBreaks:true,
                          minifyCss:true,
                          minifyJS:true,
                          removeComments:false
                          
                      }
                  }),
              )
            }
        })
    return {
        entry,
        htmlWebpackPlugins
    }
}
const {entry, htmlWebpackPlugins} = setMPA()
module.exports ={
    
    entry:entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]-server.js',
        libraryTarget:'umd'
    },
    mode: 'production',
    module:{
		rules:[
			
            {
                test:/\.(css|less)$/,
                use:'ignore-loader'
            },
           
		]
	},
    plugins:[
        new MiniCssExtractPlugin({    //通常css由style-loader插入到header上，css没有独立的文件，使用MiniCssExtractPlugin                                                     //将css抽离出来生成一个css文件
            filename:'[name]_[contenthash:8].css'
        }),
        new OptimizeCssAssetsPlugin({  
			assetNameRegExp:/\.css$/g,
			cssProcessor:require('cssnano')
		}),
        // new HtmlWebpackPlugin({  
        //     template:path.join(__dirname,'src/search.html'),
        //     filename:'search.html',
        //     chunks:['search'],
        //     inject:true,
		// 	minify:{
		// 		html5:true,
		// 	    collapseWhitespace:true,
		// 		preserveLineBreaks:true,
		// 		minifyCss:true,
		// 		minifyJS:true,
		// 		removeComments:false
				
		// 	}
		// }),
        // new HtmlWebpackPlugin({  
		// 	template:path.join(__dirname,'src/index.html'),//html模板路径，先在src目录下建立一个html空文件
        //     filename:'index.html',//打包出来的文件名称
        //     chunks:['index'],//指定生成的html文件使用哪些chunks
        //     inject:true,
		// 	minify:{
		// 		html5:true,
		// 		collapseWhitespace:true,
		// 		preserveLineBreaks:true,
		// 		minifyCss:true,
		// 		minifyJS:true,
		// 		removeComments:false
				
		// 	}
        // }),
        new CleanWebpackPlugin()
    ].concat(htmlWebpackPlugins),
    // optimization:{
    //     splitChunks:{
    //         cacheGroups:{
    //             commons:{
    //                 test:/(react|react-dom)/,//将react react-dom基础库提取出来
    //                 name: 'vendors',//提取出来的文件名
    //                 chunks:'all'
    //             }
    //         }
    //     }
    //     },
    optimization:{
        splitChunks:{
            minSize:0,
            cacheGroups:{
                commons:{
                    minChunks:2,
                    name: 'commons',//提取出来的文件名
                    chunks:'all'
                }
            }
        }
        },
    devtool:'source-map'
}