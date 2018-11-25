module.exports.professorAutenticar = function(app, req, res) {
    let professor = req.body;
    console.log(professor);
    // req.assert("email", "Email é obrigatório").notEmpty();
    // req.assert("senha", "Senha é obrigatório").notEmpty();

    let erros = req.validationErrors();
    if (erros) {
        res.render('home/index', { erros: erros , materias: []});
        return;
    }

    let connection = app.config.dbConnection();
    let professorModel = new app.app.models.professorDAO(connection);
    professorModel.professorAutenticar(professor, function(error, result) {
        if (error) {
            res.redirect('/');
            return;
        } else if (result.length > 0) {
            req.session.professorAutorizado = true;
            req.session.dadosProfessor =  { erros: erros, professor: professor };
            res.redirect('/chatProfessor');
            // res.render('chat/chatProfessor', { erros: erros, professor: professor });
            return;
        } else {
            res.send("Usuario ou senha inexistente");
            req.session.professorAutorizado = false;
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