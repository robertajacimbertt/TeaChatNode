let mysql = require('mysql');

let connMySQL = function() {
    console.log("Iniciada a conexão com o banco");
    return connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'teachat'
    });
}

module.exports = function() {
    return connMySQL;
}