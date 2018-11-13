module.exports = (app) => {
    app.get("/cargo", (req, res) => {
        const dao = new app.database.CargoDAO(app);
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
