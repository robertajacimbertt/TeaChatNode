function materiasDAO(connection) {
    this._conn = connection;
}

materiasDAO.prototype.getTodasMaterias = function(callback) {
    let sql = 'select * from materias';
    this._conn.query(sql, callback);
}

module.exports = function() {
    return materiasDAO;
}