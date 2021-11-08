const express = require('express');
const { login, register } = require('./mysql-master');
const app = express();

PORT = 8080;

app.use(express.static('static'));

app.get('/login', async(req, res) => {
    const query = req.query;

    result = await login(query)
    
    res.send(result);
});

app.get('/user_reg', async(req, res) => {
    const query = req.query;

    result = await register(query);

    console.log(result);
    
    res.send(result);
});

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});