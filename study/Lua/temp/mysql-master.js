const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'test123',
    database: 'test_db'
});
const crypto = require('crypto');

async function sql_test(){
    const connection = await pool.getConnection(async conn => conn);

    const values = ['test_id_000', crypto.createHash('sha256').update('test_hash_000' + 'test_salt_000').digest('base64'), 'test_salt_000'];

    try {
        await connection.beginTransaction();
        await connection.query('INSERT INTO test_table (id, password, salt) VALUES (?, ?, ?)', values);
        await connection.commit();
        console.log('success!');
    } catch (err) {
        await connection.rollback();
        console.log('error!');
    } finally {
        connection.release();
        return 123;
    }
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
            const compare_hash = crypto.createHash('sha256').update(password + data[0][0].salt).digest('base64');
    
            console.log('password : ' + hash + '\n' + 'compared : ' + compare_hash);

            if(hash === compare_hash){
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