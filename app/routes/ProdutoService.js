module.exports = (app) => {
    app.get("/produto", (req, res) => {
        const dao = new app.database.ProdutoDAO(app);
        dao.listar((err, result) => {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                res.send(result);
            }
        });
    });
    
    app.post("/produto", (req, res) => {
        const dao = new app.database.ProdutoDAO(app);
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
    
    app.put("/produto/:id", (req, res) => {
        const dao = new app.database.ProdutoDAO(app);
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
    
    app.delete("/produto/:id", (req, res) => {
        const dao = new app.database.ProdutoDAO(app);
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
}
