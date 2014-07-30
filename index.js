var cheerio = require('cheerio');
var through = require('event-stream').through;
var path = require('path');
var util = require('gulp-util');

var bcRegex = /bower_components\//;

module.exports = function () {

var stream = through(function write(data) {
    var $ = cheerio.load(data.contents.toString('utf8'));
    $('script,link').each(function () {
      var $el = $(this);
      var attr;
      if (this.type === 'script') {
        attr = 'src';
      } else {
        attr = 'href';
      }
      var path = $el.attr(attr);
      $el.attr(attr, path.replace(bcRegex, '../'));
    });

    var output = new util.File({
      cwd: data.cwd,
      base: data.base,
      path: data.path,
      contents: new Buffer($.html(), 'utf8')
    });

    this.emit('data', output);
  },
  function end () {
    this.emit('end');
  });

  return stream;
};
