module.exports = function(app) {
    app.post('/aluno/cadastrar', function(req, res) {
        let aluno = req.body;
        req.assert("nome", "Nome é obrigatório").notEmpty();
        req.assert("email", "Usuário é obrigatório").notEmpty();
        req.assert("senha", "Senha é obrigatório").notEmpty();

        var erros = req.validationErrors();
        if (erros) {
            res.render('home/index', { erros: erros, aluno: aluno });
            return;
        }

        let connection = app.config.dbConnection();
        let alunoModel = new app.app.models.alunoDAO(connection);

        alunoModel.storeAluno(aluno, function(error, result) {
            if (error) {
                console.log("Erro");
                console.log(error);
            }
            console.log("ALUNO SALVO");
            res.render('chat/chatAluno', { erros: erros, aluno: aluno });
        });
    });
}