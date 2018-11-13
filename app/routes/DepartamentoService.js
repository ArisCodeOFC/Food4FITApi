module.exports = (app) => {
    app.get("/departamento", (req, res) => {
        const dao = new app.database.DepartamentoDAO(app);
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
