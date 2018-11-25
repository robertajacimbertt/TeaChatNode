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
    let id_conversa = 1; 

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
