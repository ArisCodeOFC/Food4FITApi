module.exports = (app) => {
    app.get("/unidade-medida", (req, res) => {
        const dao = new app.database.UnidadeMedidaDAO(app);
        dao.listar((err, result) => {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                res.send(result);
            }
        });
    });
}