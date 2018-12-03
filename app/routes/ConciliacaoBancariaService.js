module.exports = (app) => {
    app.get("/conciliacao-bancaria/:id", (req, res) => {
        const dao = new app.database.ConciliacaoBancariaDAO(app);
        dao.listar(req.params.id, (err, result) => {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                res.send(result);
            }
        });
    });
    
    app.post("/conciliacao-bancaria/:tipo/:id", (req, res) => {
        const dao = new app.database.ConciliacaoBancariaDAO(app);
        dao.conciliar(req.params.tipo, req.params.id, (err, result) => {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                res.send(result);
            }
        });
    });
}
