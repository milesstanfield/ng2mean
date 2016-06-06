var express        = require('express');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var path           = require('path');
var db             = require('./config/db');
var mongoose       = require('mongoose');
var port           = process.env.PORT || 3000;
var app            = express();

// routing
app.use(bodyParser.json()); // get all data from body (POST) parameters
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));
// set the static files location
app.use(express.static(__dirname + '/public'));
// api routes
require('./src/app/routes/api/kittens')(app);
// route to handle all angular requests
app.get('*', function(req, res) {
  var index = path.resolve(__dirname + '/public/index.html');
  res.sendFile(index);
});

// ensure db connected and then start server
mongoose.connect(db.url, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log("Database connection ready");
  app.listen(port, function() {
    if (app.get('env') === 'development') {
      console.log('Magic happening at ' + 'http://localhost:' + port);
    } else {
      console.log('Magic happening on your site')
    }
  });
});

exports = module.exports = app;
