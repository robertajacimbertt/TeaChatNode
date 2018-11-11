module.exports.materiasListar = function(app, req, res) {
    let connection = app.config.dbConnection();
    let materiasModel = new app.app.models.materiasDAO(connection);
    materiasModel.getTodasMaterias(function(error, result) {
        console.log(result);
        if (error) {
            console.log("Erro")
        }
        res.render('/', { materias: result });
    });
}