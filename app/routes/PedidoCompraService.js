module.exports = (app) => {
    app.get("/pedido-compra", (req, res) => {
        const dao = new app.database.PedidoCompraDAO(app);
        dao.listar((err, result) => {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                res.send(result);
            }
        });
    });
    
    app.post("/pedido-compra", (req, res) => {
        const dao = new app.database.PedidoCompraDAO(app);
        dao.inserir(req.body, (err, result) => {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                const idPedido = result.insertId;
                const produtos = req.body.produtos.map(produto => [idPedido, produto.id, produto.valorUnitario, produto.quantidade]);
                dao.associarProdutos(produtos, (err, result) => {
                    if (err) {
                        res.status(500);
                        res.send(err.sqlMessage);
                    } else {
                        dao.selecionar(idPedido, (err, result) => {
                            res.send(result[0]);
                        });
                    }
                });
            }
        });
    });
    
    app.put("/pedido-compra/:id", (req, res) => {
        const dao = new app.database.PedidoCompraDAO(app);
        dao.atualizar(req.params.id, req.body, (err, result) => {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                dao.removerProdutos(req.params.id, (err, result) => {
                    if (err) {
                        res.status(500);
                        res.send(err.sqlMessage);
                    } else {
                        const produtos = req.body.produtos.map(produto => [req.params.id, produto.id, produto.valorUnitario, produto.quantidade]);
                        dao.associarProdutos(produtos, (err, result) => {
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
    
    app.delete("/pedido-compra/:id", (req, res) => {
        const dao = new app.database.PedidoCompraDAO(app);
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
    
    app.post("/pedido-compra/:id/nota-fiscal", (req, res) => {
        const dao = new app.database.PedidoCompraDAO(app);
        dao.lancarNotaFiscal(req.params.id, req.body, (err, result) => {
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
