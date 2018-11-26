module.exports = function(app) {
    app.post('/professor/cadastrar', function(req, res) {
        app.app.controllers.professor.professorCadastrar(app, req, res);
    });

    app.post('/professor/autenticar', function(req, res) {
        app.app.controllers.professor.professorAutenticar(app, req, res);
    });

    app.get('/listarMateriasLecionadas/:id_professor', function(req, res) {
        app.app.controllers.professor.listarMateriasLecionadas(app, req, res);
    });

    app.get('/chatProfessor/:id_conversa', function(req, res) { 
        // res.render('aluno/chatAluno', {aluno:req.session});
        app.app.controllers.professor.createChat(app, req, res);
    });
}

// precisa adicionar as materias que o professor da aula