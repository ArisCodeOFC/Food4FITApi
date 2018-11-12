const crypto = require("crypto");

class UsuarioDAO {
    constructor(app) {
        this.connection = app.database.Database.getConnection();
    }
    
    login(email, senha = "", callback) {
        const hash = crypto.createHash("md5").update(senha).digest("hex");
        this.connection.query("SELECT id, nome, sobrenome, email, avatar, rg, cpf, data_nascimento AS dataNascimento, genero, telefone, celular FROM tbl_usuario WHERE email = ? AND senha = ?", [email, hash], callback);
    }
}

module.exports = () => UsuarioDAO;
