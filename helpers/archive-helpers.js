var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = paths = {
  //client files
  siteAssets: path.join(__dirname, '../web/public'),
  //archives site files
  archivedSites: path.join(__dirname, '../archives/sites'),
  //list of sites
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = readListOfUrls = function(callback){
  // read the list (string of each url)
  fs.readFile(paths.list, {encoding: 'utf8'}, function(error, data) {
    // store each url as an element in an array
    var listOfUrls = data.split('\n');
    callback(listOfUrls);
  })
};

exports.isUrlInList = isUrlInList = function(targetUrl, callback){
  // get the list in array format
  readListOfUrls(function(listOfUrls) {
    var hasUrl = _.contains(listOfUrls, targetUrl);
    callback(hasUrl);
  });
};

exports.addUrlToList = function(targetUrl, callback){
  // check if already in list
  isUrlInList(targetUrl, function(is) {
    if (!is) {
      //add a URL to the list
      fs.appendFile(paths.list, targetUrl + "\n", function(err) {
        if(err) throw err;
        callback();
      });
    } 
  });
};

exports.isUrlArchived = isUrlArchived = function(targetArchive, callback){
  // checks meta data about file
  fs.stat(paths.archivedSites + "/" + targetArchive, function(err, stats){
    // if there's no metadata, then file doesn't exist
    stats === undefined ? callback(false) : callback(true);
  });
};

exports.downloadUrls = function(listOfUrls){
  // loop through list of URLs
  _.each(listOfUrls, function(url) {
    // check if archived
    isUrlArchived(url, function(exists) {
      // if not, make a get request to the site
      if(!exists) {
        request('https://' + url, function(error, response, body) {
          if(error) throw error;
          if(!error && response.statusCode === 200) {
            fs.writeFile(paths.archivedSites + '/' + url, body, function() {
              console.log('this worked');
            });
          }
        })
        // fs.writeFile(paths.archivedSites + '/' + url, 'google',function() {
        //   console.log('this worked');
        // })
      }
    })

  });
      // on end of request, write data to site folder
};




