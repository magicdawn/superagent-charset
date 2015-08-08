# superagent-charset
add charset support for node's superagent

# Install
```js
$ npm i superagent-charset
```

# Usage

`.charset(encoding)` , will passed to [iconv-lite](https://github.com/ashtuchkin/iconv-lite)

```js
var assert = require('assert');
var request = require('superagent-charset');

request
	.get('http://www.sohu.com/')
    .charset('gbk')
    .end(function(err,res) {
        assert(res.text.indexOf('搜狐') > -1);
    });
```

# License
the MIT License, http://magicdawn.mit-license.org