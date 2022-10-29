//单元测试入口文件
const path = require('path')
const process = require('process')
process.chdir(path.join(__dirname,'smoke/template'))
//'builder-webpack test case'描述这是builder-webpack的用例
describe('builder-webpack test case',()=>{
  require('./unite/webpack-base-test')//引入测试用例文件 
})