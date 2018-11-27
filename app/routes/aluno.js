module.exports = function(app) {
    app.post('/aluno/cadastrar', function(req, res) {
        app.app.controllers.aluno.alunoCadastrar(app, req, res);
    });

    app.post('/aluno/autenticar', function(req, res) {
        app.app.controllers.aluno.alunoAutenticar(app, req, res);
    });

    app.get('/listarMaterias', function(req, res) {
        if(req.session.alunoAutorizado === true){
            app.app.controllers.aluno.listarMaterias(app, req, res);
        } else {
            res.render('erro/autorizacao');
        }
    });

    app.get('/buscarProfessoresDisponiveis/:id', function(req, res) {
        if(req.session.alunoAutorizado === true){
            app.app.controllers.professor.professoresNaMateria(app, req, res);
        } else {
            res.render('erro/autorizacao');
        }
    });

    app.get('/chatAluno/:id', function(req, res) { 
        if(req.session.alunoAutorizado === true){ 
            let id_professor = req.params.id;
            app.app.controllers.aluno.createChat(app, req, res, id_professor);
        } else {
            res.render('erro/autorizacao');
        }
    });
    
    app.get("/getSessionData", function(req, res){
        res.send({ data:req.session});
    });

    app.get("/sair", function(req, res){
        req.session.alunoAutorizado = false;
        res.redirect('/');
    });
}