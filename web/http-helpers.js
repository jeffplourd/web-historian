var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  // set  'Content-Type' to the requested file's type
  headers['Content-Type'] = 'text/' + asset.split('.')[1];

  // set the current file path
  var filePath = archive.paths.siteAssets + asset;
  
  // send requested asset back to client
  fs.readFile(filePath, function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200,headers);
    res.end(data);
  });
};

exports.serveSite = function (res, userPath) {
  fs.readFile(archive.paths.archivedSites + "/" + userPath, function(err, data){
    if (err) {
      throw err;
    } else {
      res.writeHead(200, headers);
      res.end(data);
    }
  });
};

// As you progress, keep thinking about what helper functions you can put here!
