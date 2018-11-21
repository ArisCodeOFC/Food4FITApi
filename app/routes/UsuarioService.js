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
	
	app.get("/usuario/:id/compra", (req, res) => {
		const dao = new app.database.UsuarioDAO(app);
		dao.listarCompras(req.params.id, (err, result) => {
			if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                res.send(result);
            }
		});
    });
    
    app.get("/usuario/esqueci-senha", (req, res) => {
        const dao = new app.database.UsuarioDAO(app);
        dao.checarEmailExistente(req.query.email, (err, result) => {
            if (err) {
                res.status(500).send(err.sqlMessage);
            } else if (!result.length) {
                res.status(404).send("");
            } else {
                app.service.RecuperacaoSenhaService.enviarEmail(req.query.email, res);
            }
        });
    });

    app.get("/usuario/verificar-codigo", (req, res) => {
        if (app.service.RecuperacaoSenhaService.verificarCodigo(req.query.email, req.query.codigo)) {
            res.status(204).send("");
        } else {
            res.status(403).send("");
        }
    });

    app.get("/usuario/trocar-senha", (req, res) => {
        if (app.service.RecuperacaoSenhaService.verificarCodigo(req.query.email, req.query.codigo, true)) {
            const dao = new app.database.UsuarioDAO(app);
            dao.trocarSenha(req.query.email, req.query.senha, (err, result) => {
                if (err) {
                    res.status(500).send(err.sqlMessage);
                } else {
                    res.status(204).send("");
                }
            });

        } else {
            res.status(403).send("");
        }
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