module.exports = (app) => {
    app.get("/pagamento", (req, res) => {
        const dao = new app.database.PagamentoDAO(app);
        dao.listar((err, result) => {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                res.send(result);
            }
        });
    });
    
    app.post("/pagamento/:id/baixa", (req, res) => {
        const dao = new app.database.PagamentoDAO(app);
        dao.inserirBaixa(req.body, (err, result) => {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                dao.darBaixa(req.params.id, result.insertId, (err, result) => {
                    if (err) {
                        res.status(500);
                        res.send(err.sqlMessage);
                    } else {
                        res.status(204);
                        res.send("");
                    }
                });
            }
        });
    });
}
