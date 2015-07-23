var http = require("http");
var url = require('url');
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var archive = require('../helpers/archive-helpers');


// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize();

var routes = {
  '/': handler.handleRequest,
  '/styles.css': handler.handleRequest,
  '/loading.html': handler.handleRequest,
  '/www.google.com': handler.handleRequest
};

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(function(req, res) {
  var pathname = url.parse(req.url).pathname;
  var route = routes[pathname];

  if(route) {
    route(req, res);
  }else {
    // add to our list
    archive.addUrlToList(pathname.slice(1), function() {
      console.log('added new url to list');
    });
    // add to routes
    routes[pathname] = handler.handleRequest;
  }
});

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}

