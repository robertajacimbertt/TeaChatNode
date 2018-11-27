let crypto = require('crypto');

function ProfessorDAO(connection) {
    this._conn = connection;
}

ProfessorDAO.prototype.storeMateriasProfessor = function(professor, callback) {
    let id_professor = Number(professor.id_professor);
    let materias = professor.materias
    let sql = "INSERT INTO materiasProfessores (id_professor, id_materia) VALUES ";
    
    let i = materias.length;

    materias.forEach((materia, index) => {
        if(i-1 == index){
            sql= sql + "( " + id_professor + ", "+materia+" );";
        } else {
            sql= sql + "( " + id_professor + ", "+materia+" ),";
        }
    });
    this._conn.query(sql, callback);
    
}

ProfessorDAO.prototype.storeProfessor = function(professor, callback) {
    professor.senha = professor.senha.toString();
    let senhaCriptografada = crypto.createHash("md5").update(professor.senha).digest("hex");
    professor.senha = senhaCriptografada;

    this._conn.query('INSERT INTO professores (nome, senha, email) values ("'+professor.nome+'", "'+professor.senha+'", "'+professor.email+'");');
    this._conn.query('SELECT id_professor FROM professores WHERE email = "'+ professor.email +'" AND nome = "' + professor.nome + '" AND senha = "' + professor.senha +'";', callback);
}

ProfessorDAO.prototype.professorAutenticar = function(professor, callback) {
    professor.senha = professor.senha.toString();
    let senhaCriptografada = crypto.createHash("md5").update(professor.senha).digest("hex");
    professor.senha = senhaCriptografada;

    let sql = "SELECT * FROM professores WHERE email = '" + professor.email + "' AND senha = '" + professor.senha + "';";
    console.log(sql);
    this._conn.query(sql, callback);
}

module.exports = function() {
    return ProfessorDAO;
}







