module.exports = (app) => {
    app.get("/relatorio/despesas-vencidas", (req, res) => {
        const dao = new app.database.RelatorioDAO(app);
        dao.listarDespesasVencidas(req.query.dataInicial, req.query.dataFinal, (err, result) => {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                res.send(result);
            }
        });
    });
    
    app.get("/relatorio/despesas-pagas", (req, res) => {
        const dao = new app.database.RelatorioDAO(app);
        dao.listarDespesasPagas(req.query.dataInicial, req.query.dataFinal, (err, result) => {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                res.send(result);
            }
        });
    });
    
    app.get("/relatorio/receitas-receber", (req, res) => {
        const dao = new app.database.RelatorioDAO(app);
        dao.listarReceitasReceber(req.query.dataInicial, req.query.dataFinal, (err, result) => {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                res.send(result);
            }
        });
    });
    
    app.get("/relatorio/receitas-recebidas", (req, res) => {
        const dao = new app.database.RelatorioDAO(app);
        dao.listarReceitasRecebidas(req.query.dataInicial, req.query.dataFinal, (err, result) => {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                res.send(result);
            }
        });
    });
}
