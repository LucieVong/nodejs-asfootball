//L'application requiert l'utilisation du module Express.
var express = require('express'); 
 
var hostname = 'localhost'; 
var port = 8080;
 
// Nous créons un objet de type Express.  
var app = express(); 


//Etape 1 : Le serveur renvoie bonjour
var maRoute = express.Router();
maRoute.route('/bonjour')
//GET
.get(function(req,res){
	res.json({message: "Bonjour", methode : req.method});
})
app.use(maRoute);


//Etape 2 : Récupérer les données du formulaire
var express = require('express');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: true });
/*app.use(bodyParser.json());*/
app.post('/form', urlencodedParser, function(req, res){
	var reply ='';
	reply += "Le login est " + req.body.login;
	reply += " et le mot de passe est " + req.body.pwd;
	res.send(reply);
});


//Etape 3 : Envoyer les informations à NodeJS en JSON
app.post('/client', urlencodedParser, function(req, res){
  console.log(req.body);
  res.render('client', {qs: req.query});
});

//Connexion à la base de données
var express = require('express');
var maRouter = express.Router();
var mysql = require('mysql');
var readline = require('readline');

var mySqlClient = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodejs'
});

mySqlClient.connect(function(err){
  if (err){
    console.log('Erreur de connexion à la base de données');
  }
});

//Insertion d'un client à partir du serveur Nodejs
var rl=readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.question('Entrez le nom du client', (nom)=>{
  var client = {nom:nom};
rl.question("Entrez l'adresse email", (email)=>{
  var client = {email:email, nom:nom};
rl.question('Entrez un mot de passe',  (pass)=>{
  var client = {pass:pass, email:email, nom:nom};
  mySqlClient.query('INSERT INTO client SET ?', client, function(err, res){
    if(err) throw err;
  });
  rl.close();
});});});

//Création d'un client via l'index
/*mySqlClient.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var sql = "INSERT INTO client (nom, email, pass) VALUES ('John', 'john@example.com', 'johnoe77')"
  mySqlClient.query(sql, function(err, result){
    if (err){
      throw err;
    }
  console.*/


//Etape 4 : Afficher tous les clients avec l'url /clients et renvoie un tableau en JSON sur le serveur NodeJS
app.get('/clients', function(req,res,next){
mySqlClient.connect(function(err) {
  mySqlClient.query("SELECT * FROM client", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.json({
      massage: result
    });
  });
});
});

// Démarrer le serveur 
app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port+"\n"); 
});
