module.exports = (app) => {
    app.get("/fornecedor", (req, res) => {
        const dao = new app.database.FornecedorDAO(app);
        dao.listar((err, result) => {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                res.send(result);
            }
        });
    });

    app.post("/fornecedor", (req, res) => {
        const dao = new app.database.FornecedorDAO(app);
        const enderecoDao = new app.database.EnderecoDAO(app);
        const fornecedor = req.body;
        if (!fornecedor.endereco) {
            res.status(400);
            res.send("Preencha um endereço");
        } else {
            enderecoDao.inserir(fornecedor.endereco, (err, result) => {
                if (err) {
                    res.status(500);
                    res.send(err.sqlMessage);
                } else {
                    fornecedor.endereco.id = result.insertId;
                    dao.inserir(fornecedor, (err, result) => {
                        if (err) {
                            res.status(500);
                            res.send(err.sqlMessage);
                        } else {
                            dao.selecionar(result.insertId, (err, result) => {
                                res.send(result[0]);
                            });
                        }
                    });
                }
            });
        }
    });
    
    app.put("/fornecedor/:id", (req, res) => {
        const dao = new app.database.FornecedorDAO(app);
        const enderecoDao = new app.database.EnderecoDAO(app);
        const fornecedor = req.body;
        if (!fornecedor.endereco) {
            res.status(400);
            res.send("Preencha um endereço");
        } else {
            enderecoDao.atualizar(fornecedor.endereco.id, fornecedor.endereco, (err, result) => {
                if (err) {
                    res.status(500);
                    res.send(err.sqlMessage);
                } else {
                    dao.atualizar(req.params.id, fornecedor, (err, result) => {
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
        }
    });
    
    app.delete("/fornecedor/:id", (req, res) => {
        const dao = new app.database.FornecedorDAO(app);
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