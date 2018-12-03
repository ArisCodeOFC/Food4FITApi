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
    
    app.post("/despesa", (req, res) => {
        const dao = new app.database.DespesaDAO(app);
        dao.inserir(req.body, (err, result) => {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                dao.selecionar(result.insertId, (err, result) => {
                    res.send(result[0]);
                });
            }
        });
    });
    
    app.post("/despesa/multiplo", (req, res) => {
        const dao = new app.database.DespesaDAO(app);
        let contagem = 0;
        req.body.forEach(despesa => {
            dao.inserir(despesa, (err, result) => {
                contagem += 1;
                if (contagem == req.body.length) {
                    if (err) {
                        res.status(500);
                        res.send(err.sqlMessage);
                    } else {
                         res.status(204);
                        res.send("");
                    }
                }
            });
        });
    });
    
    app.put("/despesa/:id", (req, res) => {
        const dao = new app.database.DespesaDAO(app);
        dao.atualizar(req.params.id, req.body, (err, result) => {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                res.status(204);
                res.send("");
            }
        });
    });
    
    app.delete("/despesa/:id", (req, res) => {
        const dao = new app.database.DespesaDAO(app);
        dao.excluir(req.params.id, (err, result) => {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                res.status(204);
                res.send("");
            }
        });
    });
    
    app.post("/despesa/:id/baixa", (req, res) => {
        const dao = new app.database.DespesaDAO(app);
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
