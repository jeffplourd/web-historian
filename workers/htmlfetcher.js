// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');

archive.readListOfUrls(function(listOfUrls){
  archive.downloadUrls(listOfUrls);
});


// get the list of urls (using archive-helper)

// make 'get' requests to each site using http-get library
  // when we get response,
    // add html to sites folder

// note: make a cron so this updates every so often