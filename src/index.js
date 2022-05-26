const { log } = require('console');
const express = require('express')
const app = express();
const path = require('path')
const {pool} = require('./sql/connection')
var bodyParser = require('body-parser')
const session = require('express-session')
const mysqlStore = require('express-mysql-session')
const bcrypt = require('bcryptjs')
var flash = require('connect-flash');


app.set('port', 3000)
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname, '/public')));

//password encryption

const passport = require('passport');
const localStrategy = require('passport-local').Strategy

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
var jsonParser = bodyParser.json()

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

app.use(flash());

app.use(passport.initialize())
app.use(passport.session())

app.use((req,res,next)=>{
    app.locals.notSuccess = req.flash('notSuccess')
    app.locals.Success = req.flash('Success')
    next()
})

//notificaciones flash

app.get('/', function (req, res) {
    req.flash('notSuccess', 'Welcome')
    res.render(path.join(__dirname, 'html/index.ejs'), {
      title: 'Home'
    })
  });

//Encriptar la contraseña

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const finalPassword = await bcrypt.hash(password,salt)
    return finalPassword
}

//Comparar contraseña ingresada vs contraseña guardada

const matchPassword = async (password, savedPassword) =>{
    try {
        return await bcrypt.compare(password, savedPassword)
    } catch (error) {
        console.log(error);
    }
}

/*Iniciar sesión*/

passport.use('local.signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done)  => {
    let query = `SELECT * FROM usuario WHERE correo = ?`
    try {
    await pool.query(query,[email],async (error, results, fields) => {
    if (results.length > 0) {
        console.log('Existen resultados');
        console.log(results[0]);
        const match = await matchPassword(password,results[0].Contraseña)
        console.log(match);
        if (match) {
            done(null,results[0])
        } else {
            done(null, false,req.flash('error', 'La contraseña no coincide'))
        }
    } else {
        return done(null, false)
    }    
    })

    } catch (error) {
        console.log(error);
    }

}))

/*Registrarse*/

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
    console.log('Se ejecuto signup');
    let queryUserExist = `SELECT * FROM usuario WHERE correo = ?`
    await pool.query(queryUserExist,[email],async (error,results,fields) =>{
        if (error) throw error;
        if (results.length > 0) {
            console.log('El usuario existe');
            return done(null, false)
        }else{
            userFields.contraseña = await encryptPassword(password)
            let query = `INSERT INTO usuario SET ?`
            await pool.query(query,userFields, (error, results, fields) => {
                if (error) throw error;
                userFields.ID = results.insertId
                return done(null, userFields)
              })
        }
    })
}))

passport.serializeUser((user,done)=>{
    done(null,user.ID)
})

passport.deserializeUser(async (id,done)=>{
    let query = `SELECT * FROM usuario WHERE id = ?`
    await pool.query(query,[id],function (error, results, fields) {
        if (error) throw error;
        console.log('Se a ejecutado deserializeUser');
        done(null,results[0])
      })

})

//Funcion para verificar si el usuario se a logeado

const isLoggedUser = (req, res, next) =>{
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect('/auth');
    }
};

//Funcion para impedir que el usuario logeado entre a ciertas direcciones

const isNotLoggedUser = (req, res, next) =>{
    if (!req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect('/home');
    }
};


app.listen(app.get('port'), () => {
    console.log("funcionando en el puerto " + app.get('port'))
})

/*Get*/

app.get('/home',isLoggedUser, function (req, res) {
    res.render(path.join(__dirname, 'html/home.ejs'));
});

app.get('/auth',isNotLoggedUser, function (req, res) {
    res.render(path.join(__dirname, 'html/identificacion.ejs'));
});

app.get('/logout',isLoggedUser, function (req, res) {
    req.logOut();
    res.redirect('/auth')
});

/*Post*/

//Login & Register

app.post('/auth/signin',jsonParser,
passport.authenticate('local.signin',
{ successRedirect: '/home', failureRedirect: '/auth' }));

app.post('/auth/signup',jsonParser,
passport.authenticate('local.signup', 
{ successRedirect: '/home', failureRedirect: '/auth' }));



app.post('/home/addEdificio',jsonParser, async (req, res) => {
    console.log('Se ejecuto /home/addEdificio');
    console.log(req.body.nombre);
    let query = 'INSERT INTO edificio SET ?'
    let data ={
        Nombre : req.body.nombre,
        ID_Usuario : req.user.ID
    }
    console.log(req);
    await pool.query(query,data,(error, results, fields)=>{
        req.flash('Success', 'Nuevo edificio agregado')
        console.log('Este es el resultado');
        console.log(results);
        res.redirect(`/home`)
    })
});