const express = require('express');
const app = express();

const {login,register_user} = require('./mysql-master')

PORT = 8080;

app.use(express.static('static'));

app.get('/login', async(req,res) => {
    const query = req.query;
    result = await login(query);
    console.log(result);
    res.send(result);
});

app.get('/user_reg', async(req,res) => { //req는 join.html에서 보낸 "/user_reg?id=" + id + "&password=" + password + 기타 정보
    const query = req.query;
    result = await register_user(query);
    console.log(result);
    res.send(result); //res는 돌려보낼 위치, 거기에 result를 send
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
