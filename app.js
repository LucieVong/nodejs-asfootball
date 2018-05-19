/**var session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

var sess = req.session;  //initialize session variable
req.session.userId = results[0].id; //set user id
req.session.user = results[0];//set user name

 req.session.destroy(function(err) {
      //cal back method
   })

var message = '';
message = 'Wrong Credentials.';
res.render('index.ejs',{message: message});**/
   
/**
* Module dependencies.
*/
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
//var methodOverride = require('method-override');
var app = express();
var mysql      = require('mysql');
var bodyParser=require("body-parser");
var connection = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password : '',
              database : 'm2l'
            });
 
connection.connect();
 
global.db = connection;
 
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
 
app.get('/', routes.index);//call for main index page
app.get('/login', routes.index);//appel de la page login
app.get('/signup', user.signup);//appel de la page signup

app.post('/login', user.login);//call for login post
app.post('/signup', user.signup);//call for signup post

app.get('/coordonnees', function(req,res,next){
connection.connect(function(err) {
  connection.query("SELECT * FROM joueurs", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.json({
      message: result
    });

  });
});
});

app.get('/home/dashboard', user.dashboard);//call for dashboard page after login

//Middleware
app.listen(8080)