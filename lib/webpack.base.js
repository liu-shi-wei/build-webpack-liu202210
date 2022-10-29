const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const glob = require('glob')
const setMPA = () => {
    const entry= {};
    const htmlWebpackPlugins =[];
    // const entryFiles = glob.sync(path.join(__dirname,'src/*/index.js'));
    const entryFiles = glob.sync('./src/*/index.js');
    console.log('ff',entryFiles)
    Object.keys(entryFiles)
        .map((index) => {
            const entryFile = entryFiles[index]
            const match = entryFile.match(/src\/(.*)\/index\.js/);
            const pageName = match && match[1]
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
        })
    return {
        entry,
        htmlWebpackPlugins
    }
}
const {entry, htmlWebpackPlugins} = setMPA()
module.exports = {
  entry: entry,
  module:{
		rules:[
			{
				test:/.js$/,
                use:['babel-loader',
            ]
			},
            {
                test:/\.(css|less)$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader:'postcss-loader',
                        
                    },
                    {
                        loader:'px2rem-loader',
                        options:{
                            remUnit:75,//一个rem=75px(适合750的设计稿，相当于10个rem)
                            remPrecision:8,//px转换为rem的小数点个数
                        }
                    }
                ]
            },
            {
                test:/.(png|jpg|gif|jpeg)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                           name:'[name]_[hash:8].[ext]'//[hash:8] 8指hash前八位，默认由三十二位
                        }
                    }
                    
                ]
            },
            {
                test:/.(woff|woff2|eot|ttf|otf)$/,
                // use:'file-loader'
                use:[
                    {
                        loader:'file-loader',
                        options:{
                           name:'[name]_[hash:8].[ext]'//[hash:8] 8指hash前八位，默认由三十二位
                        }
                    }
                    
                ]
            },
            
		]
  },
  plugins:[
    new MiniCssExtractPlugin({    //通常css由style-loader插入到header上，css没有独立的文件，使用MiniCssExtractPlugin                                                     //将css抽离出来生成一个css文件
      filename:'[name]_[contenthash:8].css'
  }),
    new CleanWebpackPlugin(),
  ].concat(htmlWebpackPlugins)
}