//编写../../lib/webpack.base.js的测试用例
const assert = require('assert')
describe('webpack.base.js test case', () => {
  const baseConfig = require('../../lib/webpack.base')
  console.log(baseConfig)
  it('entry',()=>{
    assert.equal(baseConfig.entry.index,'')
  })
})