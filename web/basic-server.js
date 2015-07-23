var http = require("http");
var url = require('url');
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var archive = require('../helpers/archive-helpers');


// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize();

var routes = {
  '/': handler.handleStatic,
  '/styles.css': handler.handleStatic,
  '/loading.html': handler.handleStatic,
  '/www.google.com': handler.handleSites
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
    // archive.addUrlToList(pathname.slice(1), function() {
    //   console.log('added new url to list');
    // });
    // add to routes
    routes[pathname] = handler.handleSites;

    //send back 404
    res.writeHead(404);
    res.end('site not available');
  }
});


if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}

// create a new handler in request-handler file
  // refactor or make another helper for new handler

// form that submits but reloads page

// use jQuery to make AJAX request to our main URL plus user input URL
  // add the CDN for $
  // insert a script tag to make AJAX request
  // on response, we will create and append a link to the requested site
