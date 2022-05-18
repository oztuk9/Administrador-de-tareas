const { log } = require('console');
const express = require('express')
const app = express();
const path = require('path')
const {pool} = require('./sql/connection')
var bodyParser = require('body-parser')
const session = require('express-session')
const mysqlStore = require('express-mysql-session')

//password encryption

const passport = require('passport')
const localStrategy = require('passport-local').Strategy

//password encryption

const passport = require('passport')
const strategy = require('passport-local')

passport.use('local-signup', new localStrategy({
    usernameField: 'nombre',
    passwordField: 'password',
    passReqToCallback: true
},async (req, nombre, password) => {
    console.log(req.body);
}))


var jsonParser = bodyParser.json()


app.set('port', 3000)
app.use(express.static(path.join(__dirname, '/public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Middlewares

app.use(session({
    secret: 'userSession',
    resave: false,
    saveUninitialized: false,
    store: new mysqlStore({
        host: 'localhost',
        database: 'administrador_tareas',
        port: '3306',
        user: 'root',
        password: '12345'
    })
}))

app.use(passport.initialize())

app.listen(app.get('port'), () => {
    console.log("funcionando en el puerto" + app.get('port'))
})

app.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname, 'html/index.html'));
});

app.post('/home', function (req, res) {
    console.log(req.body);
});

app.get('/auth', function (req, res) {
    res.sendFile(path.join(__dirname, 'html/identificacion.html'));
});

app.post('/auth',jsonParser, function (req, res) {
    passport.authenticate('local-signup',{
        successRedirect: path.join(__dirname, 'html/index.html'),
        failureRedirect: path.join(__dirname, 'html/identificacion.html')
    })
});