'use strict'

const should = require('should')
const request = require('superagent')
const fixtures = require('./fixtures')
require('../')(request) // #charset
require('superagent-proxy')(request) // #proxy

describe('Basic Test', function() {
  it('it works', async function() {
    const res = await request
      .get('http://www.sohu.com/')
      .charset('gbk')
    res.text.should.match(/搜狐/)
  })

  it('bad charset', function() {
    (function() {
      request.get('https://www.baidu.com/')
        .charset('bad-charset')
        .end()
    }).should.throw('encoding not supported by iconv-lite')
  })

  it('automatic detection by headers', async function() {
    const res = await request
      .get('http://www.qq.com/')
      .charset() // automatic detection
    res.text.should.match(/腾讯/)
  })

  it('automatic detection by meta', async function() {
    const res = await request
      .get('http://acm.hdu.edu.cn/showproblem.php?pid=2000')
      .charset() // automatic detection
    res.text.should.match(/ASCII码排序/)
  })

  it('automatic detection by meta bad-charset', async function() {
    const server = fixtures.metaBadEncoding.listen()
    const proxy = `http://localhost:${ server.address().port }`

    let e
    try {
      await request
        .get('http://some.fake.url')
        .charset() // automatic detection
        .proxy(proxy)
    } catch (err) {
      e = err
    }

    should.exists(e)
    e.should.be.instanceof(Error)
    e.message.should.match(/encoding not supported by iconv-lite/)
  })

  it('automatic detection by default utf-8', async function() {
    const res = await request
      .get('http://files.cnblogs.com/files/52cik/cnblogs.css')
      .charset() // automatic detection
    res.text.should.match(/布局修改/)
  })
})