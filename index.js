var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'ejs');

// Static files in "static" directory
app.use(express.static('static'));

// View for ejs in "views" directory (by default)

// Routes
app.get('/', function(request, response) {
  response.render('pages/index');
});
app.get('/generate', function(request, response){
  if(request.query.q == undefined){
    response.status(400).send('Bad Request');
  }
  // TODO
  response.json(request.query.q);
});
app.get('validate', function(request, response){
  if(request.query.q == undefined || request.query.anagram){
    response.status(400).send('Bad Request');
  }
  // TODO
  response.json(true);
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
