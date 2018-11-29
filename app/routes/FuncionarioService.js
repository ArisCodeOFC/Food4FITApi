module.exports = (app) => {
    app.post("/funcionario/login", (req, res) => {
        const dao = new app.database.FuncionarioDAO(app);
        dao.login(req.body.matricula, req.body.senha, (err, result) => {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                if (result && result.length) {
                    res.send(result[0]);
                } else {
                    res.status(401);
                    res.send("Matrícula ou senha incorretos");
                }
            }
        });
    });
    
    app.get("/funcionario", (req, res) => {
        const dao = new app.database.FuncionarioDAO(app);
        dao.listar((err, result) => {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                res.send(result);
            }
        });
    });

    app.post("/funcionario", (req, res) => {
        const dao = new app.database.FuncionarioDAO(app);
        const enderecoDao = new app.database.EnderecoDAO(app);
        const funcionario = req.body;
        if (!funcionario.endereco) {
            res.status(500);
            res.send("Preencha um endereço");
        } else {
            enderecoDao.inserir(funcionario.endereco, (err, result) => {
                if (err) {
                    res.status(500);
                    res.send(err.sqlMessage);
                } else {
                    funcionario.endereco.id = result.insertId;
                    dao.inserir(funcionario, (err, result) => {
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
    
    app.put("/funcionario/:id", (req, res) => {
        const dao = new app.database.FuncionarioDAO(app);
        const enderecoDao = new app.database.EnderecoDAO(app);
        const funcionario = req.body;
        if (!funcionario.endereco) {
            res.status(500);
            res.send("Preencha um endereço");
        } else {
            enderecoDao.atualizar(funcionario.endereco.id, funcionario.endereco, (err, result) => {
                if (err) {
                    res.status(500);
                    res.send(err.sqlMessage);
                } else {
                    dao.atualizar(req.params.id, funcionario, (err, result) => {
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
    
    app.delete("/funcionario/:id", (req, res) => {
        const dao = new app.database.FuncionarioDAO(app);
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
