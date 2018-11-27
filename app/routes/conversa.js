// talvez renomear os arquivos de conversa para especifico de aluno ou conversa de professor

module.exports = function(app) {
    app.post('/conversa/getIdConversa', function(req, res) {
        app.app.controllers.conversa.buscarIdConversa(app, req, res);
    });

    app.get('/conversa/getMensagens/:id_conversa', function(req, res) {
        app.app.controllers.conversa.buscarMensagens(app, req, res);
    });

    app.post('/conversa/inserirMensagem', function(req, res) {
        app.app.controllers.conversa.inserirNovaMensagem(app, req, res);
    }); 

    app.get('/buscarChats/:id_materia', function(req, res) {
        app.app.controllers.conversa.buscarChatsComAlunos(app, req, res);
    });

    app.get('/chat/delete/:id_conversa', function(req, res){
        app.app.controllers.conversa.apagarChat(app, req, res);
    });
}
