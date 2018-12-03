module.exports = (app) => {
    app.get("/tipo-pagamento", (req, res) => {
        const dao = new app.database.TipoPagamentoDAO(app);
        dao.listar((err, result) => {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                res.send(result);
            }
        });
    });
}
