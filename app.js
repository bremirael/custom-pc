var express = require('express');
var morgan = require('morgan');
var logger = require('log4js').getLogger('Server');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mysql = require('mysql');
var app = express();

var login = require('./controllers/login.js');
var register = require('./controllers/register.js');
var user = require('./controllers/user.js');
var disconnect = require('./controllers/disconnect.js');
var admin = require('./controllers/admin.js');


// config
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('trust proxy', 1); // trust first proxy

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined')); // Active le middleware de logging
app.use(cookieParser());
app.use(express.static(__dirname + '/public')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)

logger.info('server start');

app.listen(1313);


/********** ROUTES **********/

/* Redirection si URL vide */
app.get('/', function(req, res){
    res.redirect('/login');
});

/* Formulaire de connexion */
app.get('/login', login.checkIfConnected);

/* Connexion de l'utilisateur */
app.post('/login', login.connect);

/* Envoi vers le formulaire d'inscription */
app.get('/register', function (req, res) {
    res.render('register');
});

/* Enregistrement de l'utilisateur */
app.post('/register', register);

/* On affiche le profile  */
app.get('/profile', user.profile);

/* Envoi vers le controller pour déconnecter l'utilisateur */
app.get('/user/disconnect',disconnect);

/* Redirige sur le profil de l'administrateur, différent du user */
app.get('/admin',function (req, res) {
    admin.checkAdminRights(req, res);
    res.render('admin');
});


/********** TEST CONNEXION BD ? ***********/
/* var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'epc'
});

connection.connect();

connection.query('SELECT * from user', function (err, rows, fields) {
    if (!err)
        logger.info('Le résultat de la requête: ', rows);
    else
        logger.error(err);
});

connection.end(); */

/********** FIN DU TEST ? **********/