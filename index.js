//L'application requiert l'utilisation du module Express.
var express = require('express'); 
 
var hostname = 'localhost'; 
var port = 8080;
 
// Nous créons un objet de type Express.  
var app = express(); 

//Connexion à la base de données
var express = require('express');
var maRouter = express.Router();
var mysql = require('mysql');
var readline = require('readline');

var mySqlClient = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'm2l'
});

mySqlClient.connect(function(err){
  if (err){
    console.log('Erreur de connexion à la base de données');
  }
});

var sql = "CREATE TABLE IF NOT EXISTS licencies (id INT AUTO_INCREMENT PRIMARY KEY, nom VARCHAR(255), prenom VARCHAR(255), email VARCHAR(255), login VARCHAR(120), password varchar(255))";
  mySqlClient.query(sql, function (err, result) {
  if (err) throw err;
    console.log("Table licenciés créée");
});

var sql = "CREATE TABLE IF NOT EXISTS joueurs (id INT AUTO_INCREMENT PRIMARY KEY, nom VARCHAR(255), prenom VARCHAR(255), email VARCHAR(255), tel_fixe INT(10), num_tel INT(10), nom_pere VARCHAR(255), nom_mere VARCHAR(255), prenom_pere VARCHAR(255), prenom_mere VARCHAR(255), tel_pere INT(10), tel_mere INT(10), adresse VARCHAR(255), ville VARCHAR(255), code_postal INT(5))";
  mySqlClient.query(sql, function (err, result) {
  if (err) throw err;
    console.log("Table joueurs créée");
});


// Démarrer le serveur 
app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port+"\n"); 
});