const { log } = require('console');
const express = require('express')
const app = express();
const path = require('path')
const {pool} = require('./sql/connection')
var bodyParser = require('body-parser')
const session = require('express-session')
const mysqlStore = require('express-mysql-session')
const bcrypt = require('bcryptjs')

app.set('port', 3000)
app.use(express.static(path.join(__dirname, '/public')));
// parse application/x-www-form-urlencoded

//password encryption

const passport = require('passport');
const { query } = require('express');
const localStrategy = require('passport-local').Strategy

app.use(bodyParser.urlencoded({ extended: false }))
var jsonParser = bodyParser.json()

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const finalPassword = await bcrypt.hash(password,salt)
    return finalPassword
}

const matchPassword = async (password, savedPassword) =>{
    try {
        await bcrypt.compare(password, savedPassword)
    } catch (error) {
        console.log(error);
    }
}

passport.use('local.sign.in', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},(req, email, password, done) => {
    console.log('Se ejecuto passport');
    console.log(req.body);
    const userFields ={
        email,
        password
    }
}))

passport.use('local.signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},async (req, email, password, done) => {
    const userFields ={
        nombre : req.body.username,
        correo : email,
        contraseña : password
    }
    userFields.contraseña = await encryptPassword(password)
    let query = `INSERT INTO usuario SET ?`
    pool.query(query,userFields,function (error, results, fields) {
        if (error) throw error;
        console.log(results.insertId);
        userFields.id = results.insertId
        console.log(userFields);
        return done(null, userFields)
      })
}))

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser(async (id,done)=>{
    let query = `SELECT * FROM usuario WHERE id = ?`
    await pool.query(query,[id],function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        done(null,results[0])
      })

})

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
app.use(passport.session())

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


app.post('/auth/singin',jsonParser,passport.authenticate('local.signup', { successRedirect: '/home', failureRedirect: '/auth' }));
