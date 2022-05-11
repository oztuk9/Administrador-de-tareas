const express = require('express')
const app = express();
const path = require('path')

app.set('port', 3000)
app.use(express.static(path.join(__dirname, '/public')));

app.listen(app.get('port'), () => {
    console.log("funcionando en el puerto" + app.get('port'))
})

app.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname, 'html/index.html'));
});

app.get('/auth', function (req, res) {
    res.sendFile(path.join(__dirname, 'html/identificacion.html'));
});

app.get('/ok', function (req, res) {
    res.send('ok no');
});