let crypto = require('crypto');

function AlunoDAO(connection) {
    this._conn = connection;
}

AlunoDAO.prototype.storeAluno = function(aluno, callback) {
    // let senhaCriptografada = crypto.createHash("md5").update(aluno.password).digest("hex");
    // aluno.password = senhaCriptografada;

    console.log(aluno);
    this._conn.query('insert into alunos set ?', aluno, callback);
}

module.exports = function() {
    return AlunoDAO;
}