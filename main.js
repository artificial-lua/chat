const express = require('express');
const app = express();

app.use('/', express.static('static'));

app.get('/index', function(req, res){
    result = `
    <!DOCTYPE html>
    <body>
        index page
    </body>
    `
    res.send(result)
})

app.listen(8080, function(){
    logs('listening on port 8080!')
})

function logs(str){
    console.log(str)
}
function errs(str){
    console.error(str)
}