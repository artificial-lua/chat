const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'test123',
    database: 'test_db'
});
const crypto = require('crypto');

function make_hash(password, salt){
    return crypto.createHash('sha512').update(password + salt).digest('base64');
}

function compare_hash(password, salt, hash){
    const compare_hash = crypto.createHash('sha512').update(password + salt).digest('base64');
    return compare_hash === hash;
}

async function login_test(query){
    const connection = await pool.getConnection(async conn => conn);

    let response = {};

    const id = query.id;
    const password = query.password;

    try{
        await connection.beginTransaction();
        let data = await connection.query(`SELECT * from test_table where id = ?`, id);
        await connection.commit()

        console.log(data[0]);

        if(data[0] == 0){
            console.log('id not found');
            response = {
                error : true,
                result : 'id not found'
            };
        }else{
            const hash = data[0][0].password;
            const salt = data[0][0].salt;

            if(compare_hash(password, salt, hash)){
                console.log('login success by '+ id);
                // make random session token
                const token = crypto.randomBytes(64).toString('base64');
                response = {
                    error : false,
                    result : 'login success',
                    session_token : token
                };
            }else{
                console.log('login failed by' + id);
                response = {
                    error : true,
                    result : 'login failed'
                };
            }
        }
    }catch(err){
        await connection.rollback();
        console.log(err);
    }finally{
        connection.release();
        return response;
    }
}

exports.login = login_test;

async function register_test(query){
    const connection = await pool.getConnection(async conn => conn);

    let response = {};

    const id = query.id;
    const password = query.password;
    const salt = crypto.randomBytes(12).toString('base64');

    // make values, [id, hasing password, salt]
    const values = [id, make_hash(password, salt), salt];
    
    try{
        await connection.beginTransaction();
        let data = await connection.query('INSERT INTO test_table (id, password, salt) VALUES (?, ?, ?)', values);
        await connection.commit();
        console.log(data)

        // if query error
        if(data.error){
            console.log('register failed');
            response = {
                error : true,
                result : 'register failed'
            }
        }else{
            response = {
                error : false,
                result : 'register success',
            };
        }
    }catch(err){
        await connection.rollback();
        console.log(err);
        response = {
            error : true,
            result : 'register failed'
        }
    }finally{
        connection.release();
        return response;
    }
}

exports.register = register_test;