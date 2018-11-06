module.exports = (app) => {
    app.post("/funcionario/login", (req, res) => {
        const dao = new app.database.FuncionarioDAO(app);
        console.log(req.body);
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
}