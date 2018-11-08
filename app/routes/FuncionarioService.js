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
}