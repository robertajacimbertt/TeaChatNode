module.exports.buscarIdConversa = function(app, req, res) {
    let conversa = req.body; 

    // let erros = req.validationErrors();
    // if (erros) {
    //     res.send(erros);
    //     return;
    // }

    let connection = app.config.dbConnection();
    let conversaModel = new app.app.models.conversaDAO(connection);
    conversaModel.selectConversa(conversa, function(error, resultSelect) { 
        if (error) {
            res.send(error);
            return;
        } else if (resultSelect.length > 0) {
            res.send(resultSelect);
            return;
        } else { 
            conversaModel.insertConversa(conversa, function (error, resultInsert){
                if (error) {
                    res.send(error);
                    return;
                } else if (resultInsert.affectedRows == 1 ) { 
                    conversaModel.selectConversa(conversa, function(error, result) { 
                        res.send(result);
                        return;
                    });
                } else {
                    res.send(error);
                    return;
                }
            });
        }
    });
}

module.exports.buscarMensagens = function(app, req, res) {
    let id_conversa = req.params.id_conversa; 

    // let erros = req.validationErrors();
    // if (erros) {
    //     res.send(erros);
    //     return;
    // }

    let connection = app.config.dbConnection();
    let conversaModel = new app.app.models.conversaDAO(connection);
    conversaModel.selectMensagens(id_conversa, function(error, result) { 
        if (error) {
            res.send(error);
            return;
        } else {
            res.send(result);
            return;
        } 
    });
}

module.exports.inserirNovaMensagem = function(app, req, res) { // id conversa, msg e emissor
    let conversa = req.body; 

    // let erros = req.validationErrors();
    // if (erros) {
    //     res.send(erros);
    //     return;
    // }

    let connection = app.config.dbConnection();
    let conversaModel = new app.app.models.conversaDAO(connection);
    conversaModel.insertMensagem(conversa, function(error, result) { 
        if (error) {
            res.send(error);
            return;
        } else {
            res.send(result);
            return;
        } 
    });
}

module.exports.buscarChatsComAlunos = function(app, req, res) {
    console.log(req.session);
    let id_materia = req.params.id_materia; 
    let id_professor = req.session.dadosProfessor.professor.id_professor;
    let conversa = {id_materia: Number(id_materia), id_professor: Number(id_professor)};
   req.session.materiaSelecionada = id_materia;
        let connection = app.config.dbConnection();
        let conversaModel = new app.app.models.conversaDAO(connection);
    if( id_materia &&  id_professor && conversa ){
        
        conversaModel.selectChatsComAlunos(conversa, function(error, result) { 
            console.log(error, result);
            if (error) {
                console.log("lugar2");
                res.redirect('/listarMateriasLecionadas/' + id_professor);
                return;
            } else  if ( result.length > 0 ){
                req.session.alunosComChat = result;
                res.render('professor/listagemChats', { chats:result });
                return;
            }  else { // nao tem chat na materia
                req.session.alunosComChat = result;
                res.render('professor/semChat', {id_professor: id_professor});
                return;
            }
        });
    } else {
        res.redirect('/listarMateriasLecionadas/' + id_professor);
        return;
    }
} 

module.exports.apagarChat = function(app, req, res) {
    let id_conversa = req.params.id_conversa; 

    let connection = app.config.dbConnection();
    let conversaModel = new app.app.models.conversaDAO(connection);

    conversaModel.deleteMensagem(id_conversa, function(error, result) { 
        if (error) {
            res.send(error);
            return;
        } else {
            conversaModel.deleteChat(id_conversa, function(error, result) { 
                if (error) {
                    res.send(error);
                    return;
                } else {
                    res.redirect('/listarMateriasLecionadas/' + req.session.dadosProfessor.professor.id_professor);
                    return;
                } 
            });
        } 
    });
}