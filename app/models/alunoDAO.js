let crypto = require('crypto');

function AlunoDAO(connection) {
    this._conn = connection;
}

AlunoDAO.prototype.storeAluno = function(aluno, callback) {
    // let senhaCriptografada = crypto.createHash("md5").update(aluno.password).digest("hex");
    // aluno.password = senhaCriptografada;

    this._conn.query('insert into alunos set ?', aluno, callback);
}

AlunoDAO.prototype.alunoAutenticar = function(aluno, callback) {
    // let senhaCriptografada = crypto.createHash("md5").update(usuario.password).digest("hex");
    // usuario.password = senhaCriptografada;

    let sql = "select * from alunos where email = '" + aluno.email + "' and senha = '" + aluno.senha + "'";
    this._conn.query(sql, callback);
}

module.exports = function() {
    return AlunoDAO;
}




