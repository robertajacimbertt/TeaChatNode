let crypto = require('crypto');

function ProfessorDAO(connection) {
    this._conn = connection;
}

ProfessorDAO.prototype.storeProfessor = function(professor, callback) {
    // let senhaCriptografada = crypto.createHash("md5").update(aluno.password).digest("hex");
    // aluno.password = senhaCriptografada;

    this._conn.query('INSERT INTO professores SET ?', professor, callback);
}

ProfessorDAO.prototype.professorAutenticar = function(professor, callback) {
    // let senhaCriptografada = crypto.createHash("md5").update(usuario.password).digest("hex");
    // usuario.password = senhaCriptografada;

    let sql = "SELECT * FROM professores WHERE email = '" + professor.email + "' AND senha = '" + professor.senha + "'";
    this._conn.query(sql, callback);
}

module.exports = function() {
    return ProfessorDAO;
}







