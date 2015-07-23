
var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var http_helpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  // for each request, i want to get the path
  var pathname = url.parse(req.url).pathname;
  console.log(pathname);
  
  if(pathname === '/') {
    // serve index.html
    console.log('were using this');
    http_helpers.serveAssets(res, (pathname + 'index.html'), function() {});
  }else if(pathname === '/styles.css') {
    http_helpers.serveAssets(res, pathname, function() {});    
  }else if(pathname === '/loading.html') {
    http_helpers.serveAssets(res, pathname, function() {});
  }
  // res.end(archive.paths.list);
};
 