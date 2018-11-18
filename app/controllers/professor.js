module.exports.professorAutenticar = function(app, req, res) {
    console.log("Cheguei no controller autenticar prof");
    let professor = req.body;
    console.log(professor);
    req.assert("email", "Email é obrigatório").notEmpty();
    req.assert("senha", "Senha é obrigatório").notEmpty();

    let erros = req.validationErrors();
    if (erros) {
        res.render('home/index', { erros: erros , materias: []});
        return;
    }

    let connection = app.config.dbConnection();
    let professorModel = new app.app.models.professorDAO(connection);
    professorModel.professorAutenticar(professor, function(error, result) {
        if (error) {
            console.error("professor não autenticado");
            res.redirect('/');
            return;
        } else if (result.length > 0) {
            console.error("professor autenticado");
            console.log(req.session);
            req.session.autorizado = true;
            req.session.data =  { erros: erros, professor: professor };
            res.redirect('/chatProfessor');
            // res.render('chat/chatProfessor', { erros: erros, professor: professor });
            return;
        } else {
            console.log("Usuario ou senha inexistente");
            res.send("Usuario ou senha inexistente");
            req.session.autorizado = false;
        }
    });
}