module.exports = (app) => {
    app.get("/despesa", (req, res) => {
        const dao = new app.database.DespesaDAO(app);
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
