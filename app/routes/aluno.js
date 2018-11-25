module.exports = function(app) {
    app.post('/aluno/cadastrar', function(req, res) {
        app.app.controllers.aluno.alunoCadastrar(app, req, res);
    });

    app.post('/aluno/autenticar', function(req, res) {
        app.app.controllers.aluno.alunoAutenticar(app, req, res);
    });

    app.get('/listarMaterias', function(req, res) {
        app.app.controllers.aluno.listarMaterias(app, req, res);
    });

    app.get('/buscarProfessoresDisponiveis/:id', function(req, res) {
        app.app.controllers.professor.professoresNaMateria(app, req, res);
    });

    app.get('/chatAluno/:id', function(req, res) {  
        let id_professor = req.params.id;
        // res.render('aluno/chatAluno', {aluno:req.session});
        app.app.controllers.aluno.createChat(app, req, res, id_professor);
    });
}