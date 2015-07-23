
var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var http_helpers = require('./http-helpers');
// require more modules/folders here!

exports.handleStatic = function (req, res) {
  // for each request, i want to get the path
  var pathname = url.parse(req.url).pathname;
  console.log(pathname);

  if(req.method === 'POST') {
    var userUrl = '';
    req.on('data', function(chunk) {
      userUrl += chunk;
    });

    req.on('end', function() {
      userUrl = JSON.parse(userUrl).url;
      archive.addUrlToList(userUrl, function() {
        console.log('added userUrl to file');
        res.writeHead(302);
        res.end();
      });
    })
  }else if(pathname === '/') {
    // serve index.html
    http_helpers.serveAssets(res, (pathname + 'index.html'), function() {});
  }else if(pathname === '/styles.css') {
    http_helpers.serveAssets(res, pathname, function() {});    
  }else if(pathname === '/loading.html') {
    http_helpers.serveAssets(res, pathname, function() {});
  }
};

exports.handleSites = function(req, res) {
  var pathname = url.parse(req.url).pathname;
  http_helpers.serveSite(res, pathname);
}
