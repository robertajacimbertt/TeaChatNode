function materiasDAO(connection) {
    this._conn = connection;
}

materiasDAO.prototype.listarMaterias = function(callback) {
    let sql = 'select * from materias';
    this._conn.query(sql, callback);
}

materiasDAO.prototype.professoresNaMateria = function(id_materia, callback){
    let sql = 'SELECT p.id_professor, p.nome AS nomeProfessor, p.email, m.id_materia, m.nome AS materiaNome FROM professores p INNER JOIN materiasProfessores ON p.id_professor = materiasProfessores.id_professor INNER JOIN materias m ON m.id_materia = materiasProfessores.id_materia WHERE m.id_materia = ' + id_materia;
    this._conn.query(sql, callback);
}

module.exports = function() {
    return materiasDAO;
}