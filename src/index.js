const { log } = require('console');
const express = require('express')
const app = express();
const path = require('path')
const { pool } = require('./sql/connection')
var bodyParser = require('body-parser')
const session = require('express-session')
const mysqlStore = require('express-mysql-session')
const bcrypt = require('bcryptjs')
var flash = require('connect-flash');


app.set('port', 3000)
app.set('view engine', 'ejs')
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

app.use((req, res, next) => {
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
    const finalPassword = await bcrypt.hash(password, salt)
    return finalPassword
}

//Comparar contraseña ingresada vs contraseña guardada

const matchPassword = async (password, savedPassword) => {
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
}, async (req, email, password, done) => {
    let query = `SELECT * FROM usuario WHERE correo = ?`
    try {
        await pool.query(query, [email], async (error, results, fields) => {
            if (results.length > 0) {
                console.log('Existen resultados');
                console.log(results[0]);
                const match = await matchPassword(password, results[0].Contraseña)
                console.log(match);
                if (match) {
                    done(null, results[0])
                } else {
                    done(null, false, req.flash('error', 'La contraseña no coincide'))
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
}, async (req, email, password, done) => {
    const userFields = {
        nombre: req.body.username,
        correo: email,
        contraseña: password
    }
    console.log('Se ejecuto signup');
    let queryUserExist = `SELECT * FROM usuario WHERE correo = ?`
    await pool.query(queryUserExist, [email], async (error, results, fields) => {
        if (error) throw error;
        if (results.length > 0) {
            console.log('El usuario existe');
            return done(null, false)
        } else {
            userFields.contraseña = await encryptPassword(password)
            let query = `INSERT INTO usuario SET ?`
            await pool.query(query, userFields, (error, results, fields) => {
                if (error) throw error;
                userFields.ID = results.insertId
                return done(null, userFields)
            })
        }
    })
}))

passport.serializeUser((user, done) => {
    done(null, user.ID)
})

passport.deserializeUser(async (id, done) => {
    let query = `SELECT * FROM usuario WHERE id = ?`
    await pool.query(query, [id], function (error, results, fields) {
        if (error) throw error;
        done(null, results[0])
    })

})

//Funcion para verificar si el usuario se a logeado

const isLoggedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect('/auth');
    }
};

//Funcion para impedir que el usuario logeado entre a ciertas direcciones

const isNotLoggedUser = (req, res, next) => {
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

//Ruta para ir a home

app.get('/home', isLoggedUser,
    // Funcion que se ejecuta cuando se manda a llamar a la ruta
    async function (req, res) {
        //Renderisamos el archivo .ejs y enviamos las variables
        let queryEdificios = `SELECT * FROM edificio WHERE ID_Usuario = ?`
        let queryAulas = `SELECT a.ID,a.Nombre,a.ID_Edificio FROM aula AS a INNER JOIN edificio AS e ON e.ID=A.ID_Edificio WHERE ID_Usuario = ?`
        let queryDocentes = `SELECT * FROM docente WHERE ID_Usuario = ?`
        let queryMateria = `SELECT ID, Nombre FROM materia WHERE ID_Usuario = ?`
        //Query para obtener los edificios de la base de datos
        await pool.query(queryEdificios, [req.user.ID], async (error, resultsEdificio, fields) => {
            if (error) throw error;
            await pool.query(queryAulas, [req.user.ID], async (error, resultsAula, fields) => {
                if (error) throw error;
                await pool.query(queryDocentes, [req.user.ID], async (error, resultsDocentes, fields) => {
                    if (error) throw error;
                    await pool.query(queryMateria, [req.user.ID], async (error, resultsMaterias, fields) => {
                        if (error) throw error;
                        console.log(resultsMaterias);
                        res.render(path.join(__dirname, 'html/home.ejs'), {
                            user: req.user,
                            edificios: resultsEdificio,
                            aulas: resultsAula,
                            docentes: resultsDocentes,
                            materias: resultsMaterias
                        });
                    })
                })
            })
        })
    });



/*Edificio*/

app.get('/edificio', isLoggedUser, async function (req, res) {
    let queryEdificios = `SELECT * FROM edificio WHERE ID_Usuario = ? ORDER BY nombre`
    await pool.query(queryEdificios, [req.user.ID], async (error, resultsEdificio, fields) => {
        if (error) throw error;
        res.render(path.join(__dirname, 'html/edificio.ejs'), {
            user: req.user,
            edificios: resultsEdificio
        });
    })
});

app.get('/edificio/delete/:id',isLoggedUser,async (req, res) => {
    let queryEdificios = `DELETE FROM edificio WHERE ID= ?`
    const { id } = req.params;
    await pool.query(queryEdificios, [id], async (error, resultsEdificio, fields) => {
        if (error) {
            req.flash('Success', 'El edificio no se puede eliminar por que hay aulas relacionadas')
            res.redirect('/edificio')
            throw error
        }
        console.log(id);
        req.flash('Success', 'Edificio eliminado')
        res.redirect('/edificio')
    })
})




/*Aula*/

app.get('/aula', isLoggedUser, async function (req, res) {
    let queryAulas = `SELECT a.ID,a.Nombre,a.ID_Edificio FROM aula AS a INNER JOIN edificio AS e ON e.ID=A.ID_Edificio WHERE ID_Usuario = ?`
    await pool.query(queryAulas, [req.user.ID], async (error, resultsAula, fields) => {
        if (error) throw error;
        res.render(path.join(__dirname, 'html/aula.ejs'), {
            user: req.user,
            aula: resultsAula
        });
    })
});

app.get('/aula/delete/:id',isLoggedUser,async (req, res) => {
    let queryEdificios = `DELETE FROM aula WHERE ID= ?`
    const { id } = req.params;
    await pool.query(queryEdificios, [id], async (error, resultsEdificio, fields) => {
        if (error) {
            req.flash('Success', 'No se pudo eliminar el aula por que hay materias relacionadas')
            res.redirect('/aula')
            throw error
        }
        console.log(id);
        req.flash('Success', 'Aula eliminada')
        res.redirect('/aula')
    })
})



/*Docente*/

app.get('/docente', isLoggedUser, async function (req, res) {
    let queryDocentes = `SELECT * FROM docente WHERE ID_Usuario = ?`
    await pool.query(queryDocentes, [req.user.ID], async (error, resultsDocente, fields) => {
        if (error) throw error;
        res.render(path.join(__dirname, 'html/docente.ejs'), {
            user: req.user,
            docente: resultsDocente
        });
    })
});

app.get('/docente/delete/:id',isLoggedUser,async (req, res) => {
    let queryEdificios = `DELETE FROM docente WHERE ID= ?`
    const { id } = req.params;
    await pool.query(queryEdificios, [id], async (error, resultsDocente, fields) => {
        if (error) {
            req.flash('Success', 'No se pudo eliminar el docente por que hay materias relacionadas')
            res.redirect('/docente')
            throw error
        }
        console.log(id);
        req.flash('Success', 'Docente eliminado')
        res.redirect('/docente')
    })
})




/*Materia*/

app.get('/materia', isLoggedUser, async function (req, res) {
    let queryMateria = `SELECT * FROM materia WHERE ID_Usuario = ?`
    await pool.query(queryMateria, [req.user.ID], async (error, resultsMateria, fields) => {
        if (error) throw error;
        res.render(path.join(__dirname, 'html/materia.ejs'), {
            user: req.user,
            materia : resultsMateria
        });
    })
});

app.get('/materia/delete/:id',isLoggedUser,async (req, res) => {
    let queryEdificios = `DELETE FROM materia WHERE ID= ?`
    const { id } = req.params;
    await pool.query(queryEdificios, [id], async (error, resultsDocente, fields) => {
        if (error) {
            req.flash('Success', 'No se pudo eliminar la materia por que hay tareas relacionadas')
            res.redirect('/materia')
            throw error
        }
        console.log(id);
        req.flash('Success', 'Materia eliminada')
        res.redirect('/materia')
    })
})






/*Tarea*/

app.get('/tarea', isLoggedUser, async function (req, res) {
    let queryTareas = `SELECT * FROM tarea WHERE ID_Usuario = ?`
    await pool.query(queryTareas, [req.user.ID], async (error, resultsTarea, fields) => {
        if (error) throw error;
        res.render(path.join(__dirname, 'html/tarea.ejs'), {
            user: req.user,
            tarea : resultsTarea
        });
    })
});

app.get('/tarea/delete/:id',isLoggedUser,async (req, res) => {
    let queryEdificios = `DELETE FROM tarea WHERE ID= ?`
    const { id } = req.params;
    await pool.query(queryEdificios, [id], async (error, resultsDocente, fields) => {
        if (error) {
            req.flash('Success', 'No se pudo eliminar la tarea')
            res.redirect('/tarea')
            throw error
        }
        console.log(id);
        req.flash('Success', 'Tarea eliminada')
        res.redirect('/tarea')
    })
})





/*Inicio de sesión*/

app.get('/auth', isNotLoggedUser, function (req, res) {
    res.render(path.join(__dirname, 'html/identificacion.ejs'));
});

app.get('/logout', isLoggedUser, function (req, res) {
    req.logOut();
    res.redirect('/auth')
});

/*Post*/

//Login & Register

app.post('/auth/signin', jsonParser,
    passport.authenticate('local.signin',
        { successRedirect: '/home', failureRedirect: '/auth' }));

app.post('/auth/signup', jsonParser,
    passport.authenticate('local.signup',
        { successRedirect: '/home', failureRedirect: '/auth' }));



app.post('/home/addEdificio', jsonParser, async (req, res) => {
    let query = 'INSERT INTO edificio SET ?'
    let data = {
        Nombre: req.body.nombre,
        ID_Usuario: req.user.ID
    }
    await pool.query(query, data, (error, results, fields) => {
        req.flash('Success', 'Nuevo edificio agregado')
        res.redirect(`/home`)
    })
});

app.post('/home/addAula', jsonParser, async (req, res) => {
    let query = 'INSERT INTO aula SET ?'
    let data = {
        Nombre: req.body.nombre,
        ID_Edificio: req.body.edificio
    }
    console.log(data);
    await pool.query(query, data, (error, results, fields) => {
        req.flash('Success', 'Nueva aula agregada')
        console.log('Este es el resultado de agregar aulas');
        console.log(results);
        setTimeout(function () {
            res.redirect(`/home`)
        }, 500);
    })
})

app.post('/home/addDocente', jsonParser, async (req, res) => {
    let query = 'INSERT INTO docente SET ?'
    let data = {
        Nombre: req.body.nombre,
        ID_Usuario: req.user.ID
    }
    await pool.query(query, data, (error, results, fields) => {
        req.flash('Success', 'Nuevo docente agregado')
        console.log('Este es el resultado');
        console.log(results);
        res.redirect(`/home`)
    })
});

app.post('/home/addMateria', async function (req, res) {
    count = 0
    let queryMateria = 'INSERT INTO materia SET ?'
    let queryRelacionMateriaAula = 'INSERT INTO Relacion_materia_aula SET ?'
    let queryHorarioMateria = 'INSERT INTO horario SET ?'
    let dataMateria = {
        Nombre: req.body[0].Nombre,
        Clave: req.body[0].Clave,
        Color: req.body[0].Color,
        ID_Docente: req.body[0].ID_Docente,
        ID_Usuario: req.user.ID
    }
    await pool.query(queryMateria, dataMateria, async (error, resultsMateria, fields) => {
        if (error) throw error;
        let dataRelacion_materia_aula = {
            ID_Aula: req.body[0].ID_Aula,
            ID_Materia: resultsMateria.insertId
        }
        await pool.query(queryRelacionMateriaAula, dataRelacion_materia_aula, (error, resultsRelacion, fields) => {
            if (error) throw error;
            console.log('Se ejecuto el query para insertar RELACION');
        })

        for (const e of req.body) {
            if (count <= 0) {
                console.log('Count es menor que 0', count);
                ++count
            } else {
                let dataHorario = {
                    Dia: e.Dia,
                    HoraComienza: e.HoraComienza,
                    HoraTermina: e.HoraTermina,
                    ID_Materia: resultsMateria.insertId
                }
                console.log('Insertara el siguiente dato: ', dataHorario);
                await pool.query(queryHorarioMateria, dataHorario, (error, resultsHorario, fields) => {
                    if (error) throw error;
                    console.log('Se ejecuto el query para insertar HORARIO');
                })
            }
        }
        req.flash('Success', 'Nueva materia agregada')
        console.log('Este es el resultado');
        console.log(resultsMateria);
        console.log('Fue enviado la materia');
        console.log(req.body);
        res.redirect(`/home`)
    })
});


app.post('/home/addTarea', async function (req, res) {
    count = 0
    let queryTarea = 'INSERT INTO tarea SET ?'
    let querySubtarea = 'INSERT INTO subtarea SET ?'

    let dataTarea = {
        Nombre: req.body[0].Nombre,
        Descripcion: req.body[0].Descripcion,
        Color: req.body[0].Color,
        Fecha: req.body[0].Fecha,
        Importancia : req.body[0].Importancia,
        ID_Materia: req.body[0].ID_Materia,
        ID_Usuario: req.user.ID
    }

    await pool.query(queryTarea, dataTarea, async (error, resultsTarea, fields) => {
        if (error) throw error;
        for (const e of req.body) {
            if (count <= 0) {
                console.log('Count es menor que 0', count);
                ++count
            } else {
                let dataSubtarea = {
                    Nombre: e.Nombre,
                    Descripcion: e.Descripcion,
                    ID_Tarea: resultsTarea.insertId
                }
                console.log('Insertara el siguiente dato: ', dataSubtarea);
                await pool.query(querySubtarea, dataSubtarea, (error, resultsSubtarea, fields) => {
                    if (error) throw error;
                    console.log('Se ejecuto el query para insertar subtarea');
                    console.log(resultsSubtarea);
                })
            }
        }
        req.flash('Success', 'Nueva tarea agregada')
        console.log('Este es el resultado');
        console.log(resultsTarea);
        console.log('Fue enviado la tarea');
        console.log(req.body);
        res.redirect(`/home`)
    })
});