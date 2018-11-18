let crypto = require('crypto');

function ProfessorDAO(connection) {
    this._conn = connection;
}

ProfessorDAO.prototype.storeProfessor = function(professor, callback) {
    // let senhaCriptografada = crypto.createHash("md5").update(professor.password).digest("hex");
    // professor.password = senhaCriptografada;

    console.log(professor);
    this._conn.query('insert into professores set ?', professor, callback);
}

ProfessorDAO.prototype.professorAutenticar = function(professor, callback) {
    // let senhaCriptografada = crypto.createHash("md5").update(usuario.password).digest("hex");
    // usuario.password = senhaCriptografada;

    let sql = "select * from professores where email = '" + professor.email + "' and senha = '" + professor.senha + "'";
    this._conn.query(sql, callback);
}

module.exports = function() {
    return ProfessorDAO;
}