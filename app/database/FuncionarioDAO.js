const crypto = require("crypto");

class FuncionarioDAO {
    constructor(app) {
        this.connection = app.database.Database.getConnection();
    }
    
    login(matricula, senha = "", callback) {
        const hash = crypto.createHash("md5").update(senha).digest("hex");
        this.connection.query("SELECT id, nome, sobrenome, email, matricula FROM tbl_funcionario WHERE matricula = ? AND senha = ?", [matricula, hash], callback);
    }
}

module.exports = () => FuncionarioDAO;