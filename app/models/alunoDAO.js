let crypto = require('crypto');

function AlunoDAO(connection) {
    this._conn = connection;
}

AlunoDAO.prototype.storeAluno = function(aluno, callback) {
    let senhaCriptografada = crypto.createHash("md5").update(aluno.senha).digest("hex");
    aluno.senha = senhaCriptografada;

    this._conn.query('INSERT INTO alunos SET ?', aluno, callback);
}

AlunoDAO.prototype.alunoAutenticar = function(aluno, callback) {
    let senhaCriptografada = crypto.createHash("md5").update(aluno.senha).digest("hex");
    aluno.senha = senhaCriptografada;

    let sql = "SELECT * FROM alunos WHERE email = '" + aluno.email + "' AND senha = '" + aluno.senha + "';";
    console.log(sql);
    this._conn.query(sql, callback);
}

module.exports = function() {
    return AlunoDAO;
}