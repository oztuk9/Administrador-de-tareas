const mysql = require('mysql')



const pool = mysql.createPool(
    {
        host: 'localhost',
        database: 'administrador_tareas',
        port: '3306',
        user: 'root',
        password: '12345'
    }
)

pool.getConnection((err,connection) =>{
    if(connection) connection.release();
    console.log('connected');
    return
})

module.exports={
    pool
}