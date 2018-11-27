module.exports.professorAutenticar = function(app, req, res) {
    let professor = req.body;

    let connection = app.config.dbConnection();
    let professorModel = new app.app.models.professorDAO(connection);
    professorModel.professorAutenticar(professor, function(error, result) {
        if (error) {
            res.redirect('/'); //trocar por res.send para mostrar as respostas
            return;
        } else if (result.length > 0) {
            req.session.professorAutorizado = true;
            req.session.dadosProfessor =  { erros: error, professor: result[0] };
            res.redirect('/listarMateriasLecionadas/' + result[0].id_professor);
            return;
        } else {
            res.send("Usuario ou senha inexistente");
            req.session.professorAutorizado = false;
        }
    });
}

module.exports.professorCadastrar = function (app, req, res) {
    let professor = { 
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha, 
    }; 

    let connection = app.config.dbConnection();
    let professorModel = new app.app.models.professorDAO(connection);

    professorModel.storeProfessor(professor, function(error, result) {
        if (error) {
            res.redirect('/');
            return;
        } else  {
            req.session.professorAutorizado = true;
            req.session.dadosProfessor =  { erros: error, professor: professor };
                let professorMaterias = {
                    materias: req.body.materia,
                    id_professor: result[0].id_professor,
                };
                professorModel.storeMateriasProfessor(professorMaterias, function(error, result) {
                    console.log(error, result);
                    if (error) {
                        res.redirect('/');
                        return;
                     } else {
                        res.redirect('/listarMateriasLecionadas/' + Number(professorMaterias.id_professor));
                         return;
                     }  
                 });             
        }
    });           
}

module.exports.professoresNaMateria = function(app, req, res){ 
    let id_materia = req.params.id;
    // req.assert("email", "Email é obrigatório").notEmpty();
    // req.assert("senha", "Senha é obrigatório").notEmpty();

    let erros = req.validationErrors();
    if (erros) {
        res.render('home/index', { erros: erros , materias: []});
        return;
    }

    let connection = app.config.dbConnection();
    let materiaModel = new app.app.models.materiasDAO(connection);
    materiaModel.professoresNaMateria(id_materia, function(error, result) {
        if (error) {
            res.redirect('/');
            return;
        } else if (result.length > 0) {
            req.session.materiaSelecionada = id_materia;
            req.session.professoresDisponiveis = result;
            res.render('aluno/listagemProfessores', { professoresDisponiveis: result });
            // res.redirect('/professoresDisponiveis', { erros: erros, professoresDisponiveis: result });
            return;
        } else {
            res.send("Professoers inexistentes");
            req.session.autorizado = false;
        }
    });
}

module.exports.listarMateriasLecionadas = function (app, req, res) {
    let id_professor = req.params.id_professor;
	let connection = app.config.dbConnection();
	let materiasModel = new app.app.models.materiasDAO(connection);
	materiasModel.listarMateriasLecionadas(id_professor, function(error, result){
		if(error){
            res.render('home/index', { erro: error, estudantes:[] });
            return;
        }
        console.log(result, "Resultado em controller");
        res.render('professor/listagemMaterias', {materias:result});
        return;
	});
	
}

module.exports.createChat = function (app, req, res) {
    console.log(req.params.id_conversa, '< --');
    let chatAlunoSelecionado = req.session.alunosComChat.find(item => item.id_conversa === Number(req.params.id_conversa));
    req.session.dadosDoChatAlunoSelecionado = chatAlunoSelecionado;
    res.render('professor/chatProfessor', {sessao:req.session});
}