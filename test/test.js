'use strict';

const should = require('should');
const request = require('superagent');
const charset = require('../');
charset(request); // install charset;

describe('Basic Test', function() {
  it('it works', function(done) {
    request.get('http://www.sohu.com/')
      .charset('gbk')
      .end((err, res) => {
        res.text.should.match(/搜狐/);
        done(err);
      });
  });

  it('bad charset', function() {
    (function() {
      request.get('https://www.baidu.com/')
        .charset('bad-charset')
        .end();
    }).should.throw('encoding not supported by iconv-lite');
  });

  it('automatic detection by headers', function(done) {
    request.get('http://www.qq.com/')
      .charset() // automatic detection
      .end((err, res) => {
        res.text.should.match(/腾讯/);
        done(err);
      });
  });

  it('automatic detection by meta', function(done) {
    request.get('http://acm.hdu.edu.cn/showproblem.php?pid=2000')
      .charset() // automatic detection
      .end((err, res) => {
        res.text.should.match(/ASCII码排序/);
        done(err);
      });
  });

  it('automatic detection by default utf-8', function(done) {
    request.get('http://files.cnblogs.com/files/52cik/cnblogs.css')
      .charset() // automatic detection
      .end((err, res) => {
        res.text.should.match(/布局修改/);
        done(err);
      });
  });
});
