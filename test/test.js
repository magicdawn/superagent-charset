'use strict';

const assert = require('assert');
const request = require('../');
const should = require('should');

describe('Basic Test', function() {

  it('it works', function(done) {
    request.get('http://www.sohu.com/')
      .charset('gbk')
      .end(function(err, res) {
        res.text.should.match(/搜狐/);
        done(err);
      });
  });

});