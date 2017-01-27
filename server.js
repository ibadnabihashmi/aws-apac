var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('express-flash');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.load();

// Controllers
var HomeController = require('./controllers/home');
var contactController = require('./controllers/contact');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3005);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(methodOverride('_method'));
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', HomeController.index);
app.get('/contact', contactController.contactGet);
app.post('/contact', contactController.contactPost);
app.get('/getTest',function (req,res) {
  res.render('test');
});
app.get('/test',function (req,res) {
  var OperationHelper = require('apac').OperationHelper;

  var opHelper = new OperationHelper({
    awsId:     'AKIAIOHILJDN5U7NCUFA',
    awsSecret: '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',
    assocId:   'keevaorganics-20'
  });

  opHelper.execute('BrowseNodeLookup', {
    BrowseNodeId: 2407756011
  }).then(function (response) {
    res.status(200).send({
      status:200,
      result:response
    });
  }).catch(function (response) {
    res.status(500).send({
      status:500,
      err:response.err
    });
  });
});

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
