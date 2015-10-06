'use strict';

var assert = require('assert');
var request = require('../');
var should = require('should');

describe('Basic Test', function() {

  it('should work ?', function(done) {
    request.get('http://www.sohu.com/')
      .charset('gbk')
      .end(function(err, res) {
        res.text.should.match(/搜狐/);
        done();
      });
  });

});