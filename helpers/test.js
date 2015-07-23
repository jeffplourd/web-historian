var request = require('request');

request('http://www.google.com', function(error, response, body) {
  if(error) {
    throw error;
  }

  if(!error && response.statusCode === 200) {
    console.log(body); 
  }
});