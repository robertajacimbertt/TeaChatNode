module.exports = function(app) {
    app.post('/professor/cadastrar', function(req, res) {
        let professor = req.body;
        req.assert("nome", "Nome é obrigatório").notEmpty();
        req.assert("email", "Usuário é obrigatório").notEmpty();
        req.assert("senha", "Senha é obrigatório").notEmpty();

        var erros = req.validationErrors();
        if (erros) {
            res.render('home/index', { erros: erros, professor: professor });
            return;
        }

        let connection = app.config.dbConnection();
        let professorModel = new app.app.models.professorDAO(connection);

        professorModel.storeProfessor(professor, function(error, result) {
            if (error) {
                console.log("Erro");
                console.log(error);
            }
            console.log("PROFESSOR SALVO");
            res.redirect('/');
        });
    });

    app.post('/professor/autenticar', function(req, res) {
        console.log("Cheguei na rota de autenticacao professor");
        app.app.controllers.professor.professorAutenticar(app, req, res);
    });
}