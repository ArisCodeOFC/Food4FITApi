const crypto = require("crypto");

class FuncionarioDAO {
    constructor(app) {
        this.connection = app.database.Database.getConnection();
    }
    
    login(matricula, senha = "", callback) {
        const hash = crypto.createHash("md5").update(senha).digest("hex");
        this.connection.query("SELECT id, nome, sobrenome, email, matricula FROM tbl_funcionario WHERE matricula = ? AND senha = ?", [matricula, hash], callback);
    }
    
    listar(callback) {
        this.connection.query("SELECT f.id, f.nome, f.sobrenome, f.email, f.matricula, f.data_efetivacao AS dataAdmissao, c.cargo FROM tbl_funcionario AS f INNER JOIN tbl_funcionario_cargo AS fc ON f.id = fc.id_funcionario INNER JOIN tbl_cargo AS c ON c.id = fc.id_cargo", callback);
    }
}

module.exports = () => FuncionarioDAO;