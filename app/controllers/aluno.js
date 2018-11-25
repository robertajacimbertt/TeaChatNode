module.exports.alunoAutenticar = function(app, req, res) {
    let aluno = req.body;
    req.assert("email", "Email é obrigatório").notEmpty();
    req.assert("senha", "Senha é obrigatório").notEmpty();

    let erros = req.validationErrors();
    if (erros) {
        res.render('home/index', { erros: erros , materias: []});
        return;
    }

    let connection = app.config.dbConnection();
    let alunoModel = new app.app.models.alunoDAO(connection);
    alunoModel.alunoAutenticar(aluno, function(error, result) {
        if (error) {
            res.redirect('/');
            return;
        } else if (result.length > 0) {
            console.log(result);
            req.session.alunoAutorizado = true;
            // req.session.idAluno = result[0].id_aluno;
            req.session.dadosAluno =  { erros: erros, aluno: result[0] };
            res.redirect('/listarMaterias');
            // res.render('chat/chatAluno', { erros: erros, aluno: aluno });
            return;
        } else {
            res.send("Usuario ou senha inexistente");
            req.session.alunoAutorizado = false;
        }
    });
}

module.exports.alunoCadastrar = function (app, req, res) {
    let aluno = req.body;
    // req.assert("nome", "Nome é obrigatório").notEmpty();
    // req.assert("email", "Usuário é obrigatório").notEmpty();
    // req.assert("senha", "Senha é obrigatório").notEmpty();

    var erros = req.validationErrors();
    if (erros) {
        res.render('home/index', { erros: erros, aluno: aluno });
        return;
    }

    let connection = app.config.dbConnection();
    let alunoModel = new app.app.models.alunoDAO(connection);

    alunoModel.storeAluno(aluno, function(error, result) {
        if (error) {
            res.redirect('/');
            return;
        } else  {
            console.log(result);
            req.session.alunoAutorizado = true;
            req.session.dadosAluno =  { erros: erros, aluno: aluno };
            res.redirect('/listarMaterias');
            return;
        }
    });           
}

module.exports.listarMaterias = function (app, req, res) {
	let connection = app.config.dbConnection();
	let materiasModel = new app.app.models.materiasDAO(connection);
	materiasModel.listarMaterias(function(error, result){
		if(error){
            console.log("Erro");
            res.render('home/index', { erro: error, estudantes:[] });
		}
		res.render('aluno/listagemMaterias', {materias:result});
	});
	
}

module.exports.createChat = function (app, req, res, id_professor) {
    let professorSelecionado = req.session.professoresDisponiveis.find(item => item.id_professor === Number(id_professor));
    req.session.dadosProfessor = professorSelecionado;
    res.render('aluno/chatAluno', {sessao:req.session});
}