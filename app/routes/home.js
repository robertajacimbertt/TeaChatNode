module.exports = function(app) {
    app.get('/', function(req, res) {
        app.app.controllers.home.listarMaterias(app, req, res);
    });
}
