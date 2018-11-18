module.exports.listarMaterias = function (app, req, res) {
	let connection = app.config.dbConnection();
	let materiasModel = new app.app.models.materiasDAO(connection);
	materiasModel.listarMaterias(function(error, result){
        console.log(result);
		if(error){
            console.log("Erro");
            // res.render('home/index', {estudantes:[]});
		}
		res.render('home/index', {materias:result});
	});
	
}