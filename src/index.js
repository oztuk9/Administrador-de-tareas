const { log } = require('console');
const express = require('express')
const app = express();
const path = require('path')
const {pool} = require('./sql/connection')
var bodyParser = require('body-parser')


var jsonParser = bodyParser.json()


app.set('port', 3000)
app.use(express.static(path.join(__dirname, '/public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

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
    const auth = require('./public/js/auth')
    let body = req.body
    auth.prueba(body)
    console.log(body);
});