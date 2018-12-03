module.exports = (app) => {
    app.get("/fluxo-caixa", (req, res) => {
        const dao = new app.database.FluxoCaixaDAO(app);
        dao.listar(req.query.dataInicial, req.query.dataFinal, (err, result) => {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                res.send(result);
            }
        });
    });
}
