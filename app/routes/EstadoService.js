module.exports = (app) => {
    app.get("/estado", (req, res) => {
        const dao = new app.database.EstadoDAO(app);
        dao.listar((err, result) => {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                res.send(result);
            }
        });
    });
    
    app.get("/estado/:id/cidade", (req, res) => {
        const dao = new app.database.EstadoDAO(app);
        dao.listarCidades(req.params.id, (err, result) => {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                res.send(result);
            }
        });
    });
}
