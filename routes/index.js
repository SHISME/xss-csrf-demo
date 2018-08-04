var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');

/* GET home page. */

const attack_code = '<script nonce=\"EDNnf03nceIOfn39fn3e9h3sdfa\">console.warn("attack")</script>';
const attack_code2 = '<img src="sadff" onerror="console.warn(\'attack\')"/>';

const blackFillter = function (html) {
  if (!html) return '';
  html = html.replace(/<\s*\/?script\s*>/g, '');
  return html;
};

const whiteFillter = function (html) {
  if (!html) return '';
  var $ = cheerio.load(html);

  var whiteList = {
    img:['src',],
    body:[],
    html:[],
  }
  $('*').each((index, elem) => {
    if (!whiteList[elem.name]) {
      $(elem).remove();
      return;
    }
    for (let attr in elem.attribs) {
      if (whiteList[elem.name].indexOf(attr) === -1) {
        $(elem).attr(attr, null);
      }
    }
  });
  return $.html();
}

router.get('/', function(req, res, next) {
  var content = attack_code;
  //   var content = blackFillter(attack_code2);
  //   var content = whiteFillter(attack_code2);
  res.set('Content-Security-Policy', 'style-src  \'self\'  \'unsafe-inline\'; script-src \'nonce-EDNnf03nceIOfn39fn3e9h3sdfa\'');
  res.render('index', { title: content});
});

module.exports = router;
