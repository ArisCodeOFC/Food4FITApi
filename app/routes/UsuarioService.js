const crypto = require("crypto");

module.exports = (app) => {
    app.post("/usuario/login", (req, res) => {
        const dao = new app.database.UsuarioDAO(app);
        dao.login(req.body.email, req.body.senha, (err, result) => {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                if (result && result.length) {
                    const usuario = result[0];
                    setHash(usuario, req.body.email, req.body.senha);
                    res.send(usuario);
                } else {
                    res.status(401);
                    res.send("Usuário ou senha incorretos");
                }
            }
        });
    });
    
    app.put("/usuario/:id", (req, res) => {
        const dao = new app.database.UsuarioDAO(app);
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
}

function setHash(usuario, email, senha) {
    let hash = Buffer.from(email).toString("base64") + ":" + Buffer.from(senha).toString("base64");
    hash = crypto.createHash("md5").update(hash).digest("hex");
    hash = crypto.createHash("sha256").update(hash).digest("hex");
    hash = crypto.createHash("md5").update(hash + "FOOD4FIT").digest("hex");
    hash = crypto.createHash("sha256").update(hash).digest("hex");
    hash = Buffer.from(hash).toString("base64");
    usuario.hash = hash;
}