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

    app.post('/aluno/autenticar', function(req, res) {
        console.log("Cheguei na rota de autenticacao");
        app.app.controllers.aluno.alunoAutenticar(app, req, res);
    });

    app.get('/chatAluno', function(req, res) {        
        res.render('chat/chatAluno', {aluno:req.session.data});
        // app.app.controllers.home.listarMaterias(app, req, res);
    });
}
