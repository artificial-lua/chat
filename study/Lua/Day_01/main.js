const express = require('express');
const app = express();

app.use('/', express.static('static'))

app.get('/', function(req, res){
    res.send('123');
})

app.get('/test', function(req, res){
    let a = 1 + 2;

    res.send('result = ' + a);
})

app.lisetn(8080);