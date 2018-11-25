
function ConversaDAO(connection) {
    this._conn = connection;
}

ConversaDAO.prototype.insertConversa = function(conversa, callback) { // id_professor, id_aluno, id_materia
    this._conn.query('insert into conversas set ?', conversa, callback);
}

ConversaDAO.prototype.selectConversa = function(conversa, callback) { 
    let sql = "select id_conversa from conversas where id_aluno = " + conversa.id_aluno + " and id_professor = " + conversa.id_professor + " and id_materia = " + conversa.id_materia ;
    this._conn.query(sql, callback);
}

ConversaDAO.prototype.selectMensagens = function(id_conversa, callback) { 
    console.log("ID da Conversa no DAO: ", id_conversa);
    let sql = "SELECT * FROM mensagens WHERE id_conversa = " + id_conversa ;
    this._conn.query(sql, callback);
}

module.exports = function() {
    return ConversaDAO;
}
