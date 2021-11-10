const mysql = require('mysql2/promise');
const pool = mysql.createPool(
    {
        host: 'localhost',
        user: 'root',
        password: '3639cqa9464',
        database: 'user_info',
        port: 33060
    }
);

const crypto = require('crypto');
console.log('start server')

//create join method

data = {
    id: 'test_id',
    password: 'test_password'
}

function make_hash(password, salt){
    const hash = crypto.createHash('sha512').update(password + salt).digest('base64');
    return hash;
}

function compare_password(password,salt,hash){
    const hash_password = make_hash(password,salt);

    console.log(hash)
    console.log(hash_password)

    if(hash_password === hash){
        return true;
    }else{
        return false;
    }

    
}

async function login_user(query){
    const connection = await pool.getConnection();

    let response = {};
    
    const id = query.id;
    const password = query.password;
    
    try{

        await connection.beginTransaction();
        let data = await connection.query('SELECT * from user_info_table where id=?',[id]);
        await connection.commit();

        console.log(data[0]);

        //response.error = false;
        //response.message = 'log in';

        if (data[0] === undefined){
            console.log('id does not exist');
            response.error = true;
            response.message = 'log in failed';
        }else{
            if(compare_password(password,data[0][0].salt, data[0][0].password)){
                console.log('password is correct');
                response.error = false;
                response.message = 'login success';
            }else{
                console.log('password is inccorect');
                response.error = true;
                response.message = 'login failed';
            }
        }

    }catch(err){
        console.log(err);
        response.err = true;
        response.message = 'login failed';
    }finally{
        connection.release();
        return response;
    }
}

exports.login=login_user;

//비동기가 포함되었다를 나타내기 위해 async
async function register_user(query){
    const connection = await pool.getConnection();

    let response = {};
    
    const id = query.id;
    const password = query.password;
    
    const salt = crypto.randomBytes(15).toString('base64');
    const hash = make_hash(password,salt);

    try{

        await connection.beginTransaction();
        let data = await connection.query('insert into user_info_table (id, password, salt) values(?,?,?)', [id,hash,salt]);
        await connection.commit();
        console.log(data);

        response.error = false;
        response.message = 'success';

    }catch(err){
        console.log(err);
        response.err = true;
        response.message = 'register failed';
    }finally{
        connection.release();
        return response;
    }
}

exports.register_user = register_user;

function main(){
    register_user(data);
}
