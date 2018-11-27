module.exports = function(app) {
    app.post('/professor/cadastrar', function(req, res) {
        app.app.controllers.professor.professorCadastrar(app, req, res);
    });

    app.post('/professor/autenticar', function(req, res) {
        app.app.controllers.professor.professorAutenticar(app, req, res);
    });

    app.get('/listarMateriasLecionadas/:id_professor', function(req, res) {
        if(req.session.professorAutorizado === true){
            app.app.controllers.professor.listarMateriasLecionadas(app, req, res);
        } else {
            res.render('erro/autorizacao');
        }
    });

    app.get('/chatProfessor/:id_conversa', function(req, res) { 
        if(req.session.professorAutorizado === true){
            app.app.controllers.professor.createChat(app, req, res);
        } else {
            res.render('erro/autorizacao');
        }
    });
}

// precisa adicionar as materias que o professor da aula