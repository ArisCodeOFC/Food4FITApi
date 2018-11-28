module.exports = (app) => {
    app.get("/permissao", (req, res) => {
        const dao = new app.database.PermissaoDAO(app);
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