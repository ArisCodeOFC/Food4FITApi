const crypto = require("crypto");

class UsuarioDAO {
    constructor(app) {
        this.connection = app.database.Database.getConnection();
    }
    
    login(email, senha = "", callback) {
        const hash = crypto.createHash("md5").update(senha).digest("hex");
        this.connection.query("SELECT id, nome, sobrenome, email, avatar, rg, cpf, data_nascimento AS dataNascimento, genero, telefone, celular FROM tbl_usuario WHERE email = ? AND senha = ?", [email, hash], callback);
    }
    
    atualizar(id, usuario, callback) {
        this.connection.query("UPDATE tbl_usuario SET nome = ?, sobrenome = ?, genero = ?, telefone = ?, celular = ? WHERE id = ?", [usuario.nome, usuario.sobrenome, usuario.genero, usuario.telefone, usuario.celular, id], callback);
    }
	
	listarCompras(id, callback) {
		this.connection.query("SELECT p.data, pos.quantidade, pr.titulo, pr.id AS idPrato, os.id AS idOrdemServico, os.id_usuario AS idUsuario, pr.preco AS valor FROM tbl_ordem_servico AS os INNER JOIN tbl_pedido AS p ON p.id_ordem_servico = os.id INNER JOIN tbl_prato_ordem_servico AS pos ON pos.id_ordem_servico = os.id INNER JOIN tbl_prato AS pr ON pr.id = pos.id_prato WHERE os.id_usuario = ? AND p.status = 1 AND DATEDIFF(NOW(), p.data) < pos.quantidade", [id], callback);
	}
}

module.exports = () => UsuarioDAO;
