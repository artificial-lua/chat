const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'test123',
    database: 'user_info'
});
const crypto = require('crypto');

// create join method
data = {
    id: 'test_id',
    password: 'test_password'
}

function compare_password(password, salt, hash){
    const hash_password = make_hash(password, salt);

    if(hash_password === hash){
        return true;
    }else{
        return false;
    }
}

function make_hash(password, salt){
    const hash = crypto.createHash('sha512').update(password + salt).digest('base64');

    return hash;
}

async function login_user(query){
    const connection = await pool.getConnection();

    let response = {};

    const id = query.id;
    const password = query.password;

    try{
        await connection.beginTransaction();
        let data = await connection.query('SELECT * from user_info_table where id = ?', [id]);
        await connection.commit();

        console.log(data[0]);

        // response.error = false;
        // response.message = 'login success';
        if(data[0] === undefined){
            console.log('id does exist');
            response.error = true;
            response.message = 'login failed';
        }else{
            if(compare_password(password, data[0][0].salt, data[0][0].password)){
                console.log('password is correct');
                response.error = false;
                response.message = 'login success';
            }else{
                console.log('password is incorrect');
                response.error = true;
                response.message = 'login failed';
            }
        }
    }catch(err){
        console.log(err);
        response.error = true;
        response.message = 'login failed';
    }finally{
        connection.release();
        return response;
    }
}

exports.login = login_user;

async function register_user(query){
    const connection = await pool.getConnection();

    let response = {};

    const id = query.id;
    const password = query.password;
    const salt = crypto.randomBytes(15).toString('base64');
    const hash = make_hash(password, salt);

    try{
        await connection.beginTransaction();
        let data = await connection.query('insert into user_info_table (id, password, salt) values (?, ?, ?)', [id, hash, salt]);
        await connection.commit();
        console.log(data);

        response.error = false;
        response.message = 'success';
    }catch(err){
        console.log(err);
        response.error = true;
        response.message = 'register faile';
    }finally{
        connection.release();
        return response;
    }
}

exports.register_user = register_user;

function main(){
    register_user(data);
}

// main();