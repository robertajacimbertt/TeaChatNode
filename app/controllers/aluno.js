module.exports.alunoAutenticar = function(app, req, res) {
    console.log("Cheguei no controller autenticar aluno");
    let aluno = req.body;
    console.log(aluno);
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
            console.error("Aluno não autenticado");
            res.redirect('/');
            return;
        } else if (result.length > 0) {
            console.error("Aluno autenticado");
            console.log(req.session);
            req.session.autorizado = true;
            req.session.data =  { erros: erros, aluno: aluno };
            res.redirect('/listarMaterias');
            // res.render('chat/chatAluno', { erros: erros, aluno: aluno });
            return;
        } else {
            console.log("Usuario ou senha inexistente");
            res.send("Usuario ou senha inexistente");
            req.session.autorizado = false;
        }
    });
}

module.exports.listarMaterias = function (app, req, res) {
	let connection = app.config.dbConnection();
	let materiasModel = new app.app.models.materiasDAO(connection);
	materiasModel.listarMaterias(function(error, result){
        console.log(result);
		if(error){
            console.log("Erro");
            res.render('home/index', { erro: error, estudantes:[] });
		}
		res.render('listagem/aluno', {materias:result});
	});
	
}