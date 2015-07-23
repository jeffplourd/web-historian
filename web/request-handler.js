
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
    http_helpers.serveAssets(res, (pathname + 'index.html'), function() {});
  }else if(pathname === '/styles.css') {
    http_helpers.serveAssets(res, pathname, function() {});    
  }else if(pathname === '/loading.html') {
    http_helpers.serveAssets(res, pathname, function() {});
  }

  if(req.method === "POST") {
    var userAddedUrl = '';
    req.on('data', function(data) {
      userAddedUrl += data;
    });
    req.on('end', function() {
      console.log(userAddedUrl.toString('utf8').slice(4));
      // check to see if it's in sites folder
        // if it is, then send file to client
        // if it isn't, then send fileHeader 404 and maybe 'loading.html'
    });

  }

  // res.end(archive.paths.list);
};
 