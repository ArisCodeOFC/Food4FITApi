module.exports = (app) => {
    app.get("/classificacao-produto", (req, res) => {
        const dao = new app.database.ClassificacaoProdutoDAO(app);
        dao.listar((err, result) => {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                res.send(result);
            }
        });
    });
    
    app.post("/classificacao-produto", (req, res) => {
        const dao = new app.database.ClassificacaoProdutoDAO(app);
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
    
    app.put("/classificacao-produto/:id", (req, res) => {
        const dao = new app.database.ClassificacaoProdutoDAO(app);
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
    
    app.delete("/classificacao-produto/:id", (req, res) => {
        const dao = new app.database.ClassificacaoProdutoDAO(app);
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
