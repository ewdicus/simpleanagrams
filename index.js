'use strict';

var express = require('express');
var anagram = require('./anagram.js');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'ejs');

// Views for ejs in "views" directory (by default)
// Static files in "static" directory
app.use(express.static('static'));


// Routes
app.get('/', function(request, response) {
  response.render('pages/index');
});
app.get('/generate', function(request, response){

  // Bad response if we don't have a query
  if(request.query.q == undefined){
    return response.status(400).send('Must include a query: ?q=word');
  }

  var query = request.query.q;

  // A bit arbitrary, but long queries take a very long time. This seems ok
  var max_query_length = 12
  if(query.length > max_query_length){
    return response.status(400).send('Maximum query length is ' + max_query_length);
  }

  // Make sure the query is just letters and spaces
  if(/^[a-zA-Z\ ]+$/.test(query) === false){
    return response.status(400).send('Query must only contain letters and spaces');
  }

  // Get an anagram for the word
  var result = anagram.for(query.toLowerCase());
  response.json(result);
});
app.get('/validate', function(request, response){

  // Bad response if we don't have a query and an anagram to test against
  if(request.query.q == undefined || request.query.anagram == undefined){
    response.status(400).send('Must include a query and anagram: ?q=word&anagram=another');
  }

  var query = request.query.q;
  var test_anagram = request.query.anagram

  // Make sure the query is just letters and spaces
  if(/^[a-zA-Z\ ]+$/.test(query) === false){
    return response.status(400).send('Query must only contain letters and spaces');
  }

  // Make sure the anagram is just letters and spaces
  // Make sure the query is just letters
  if(/^[a-zA-Z\ ]+$/.test(test_anagram) === false){
    return response.status(400).send('Anagram must only contain letters and spaces');
  }

  // Validate the anagram
  var result = anagram.validate(query.toLowerCase(), test_anagram.toLowerCase());
  response.json(result);
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
