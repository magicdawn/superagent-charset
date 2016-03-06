# superagent-charset
add charset support for node's superagent

# Install
```js
$ npm i superagent-charset --save
```

# Usage

`.charset(encoding)` , will passed to [iconv-lite](https://github.com/ashtuchkin/iconv-lite)

```js
const charset = require('../');
const should = require('should');

describe('Basic Test', function() {
  it('it works', function(done) {
    // install charset;
    const request = require('superagent');
    charset(request);

    request.get('http://www.sohu.com/')
      .charset('gbk')
      .end((err, res) => {
        res.text.should.match(/搜狐/);
        done(err);
      });
  });
});
```

# License
the MIT License, http://magicdawn.mit-license.org