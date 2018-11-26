
function ConversaDAO(connection) {
    this._conn = connection;
}

ConversaDAO.prototype.insertConversa = function(conversa, callback) { // id_professor, id_aluno, id_materia
    this._conn.query('INSERT INTO conversas SET ?', conversa, callback);
}

ConversaDAO.prototype.selectConversa = function(conversa, callback) { 
    let sql = "SELECT id_conversa FROM conversas WHERE id_aluno = " + conversa.id_aluno + " AND id_professor = " + conversa.id_professor + " AND id_materia = " + conversa.id_materia + ";";
    this._conn.query(sql, callback);
}

ConversaDAO.prototype.selectMensagens = function(id_conversa, callback) { 
    let sql = "SELECT * FROM mensagens WHERE id_conversa = " + id_conversa + ";";
    this._conn.query(sql, callback);
}

ConversaDAO.prototype.insertMensagem = function(conversa, callback) { 
    console.log("Conversa no DAO: ", conversa);
    let sql = "INSERT INTO mensagens (id_conversa, mensagem, emissor) VALUES (" + conversa.id_conversa + ", '" + conversa.mensagem + "', '" + conversa.emissor + "');" ;
    this._conn.query(sql, callback);
}

ConversaDAO.prototype.selectChatsComAlunos = function(conversa, callback) { 
    console.log("Conversa ", conversa);
    let sql = "SELECT c.id_conversa, c.id_aluno, a.nome AS nomeAluno FROM conversas c INNER JOIN alunos a ON c.id_aluno = a.id_aluno WHERE c.id_professor = "  + conversa.id_professor + " AND c.id_materia = " + conversa.id_materia + ";";
    console.log(sql);
    this._conn.query(sql, callback);
}

module.exports = function() {
    return ConversaDAO;
}
