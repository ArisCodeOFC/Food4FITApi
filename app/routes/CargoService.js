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
    
    app.post("/cargo", (req, res) => {
        const dao = new app.database.CargoDAO(app);
        const permissaoDao = new app.database.PermissaoDAO(app);
        dao.inserir(req.body, (err, result) => {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                const idCargo = result.insertId;
                const permissoes = req.body.permissoes.map(permissao => [permissao.id, idCargo]);
                permissaoDao.associarCargo(permissoes, (err, result) => {
                    if (err) {
                        res.status(500);
                        res.send(err.sqlMessage);
                    } else {
                        dao.selecionar(idCargo, (err, result) => {
                            res.send(result[0]);
                        });
                    }
                });
            }
        });
    });
    
    app.put("/cargo/:id", (req, res) => {
        const dao = new app.database.CargoDAO(app);
        const permissaoDao = new app.database.PermissaoDAO(app);
        dao.atualizar(req.params.id, req.body, (err, result) => {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                permissaoDao.removerPermissoesCargo(req.params.id, (err, result) => {
                    if (err) {
                        res.status(500);
                        res.send(err.sqlMessage);
                    } else {
                        const permissoes = req.body.permissoes.map(permissao => [permissao.id, req.params.id]);
                        permissaoDao.associarCargo(permissoes, (err, result) => {
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
    });
    
    app.delete("/cargo/:id", (req, res) => {
        const dao = new app.database.BancoDAO(app);
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
