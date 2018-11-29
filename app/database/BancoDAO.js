class BancoDAO {
    constructor(app) {
        this.connection = app.database.Database.getConnection();
    }
    
    listar(callback) {
        this.connection.query("SELECT id, banco, agencia, conta FROM tbl_banco", callback);
    }
    
    selecionar(id, callback) {
        this.connection.query("SELECT id, banco, agencia, conta FROM tbl_banco WHERE id = ?", [id], callback);
    }
    
    inserir(dados, callback) {
        this.connection.query("INSERT INTO tbl_banco (banco, agencia, conta) VALUES (?, ?, ?)", [dados.banco, dados.agencia, dados.conta], callback);
    }
    
    atualizar(id, dados, callback) {
        this.connection.query("UPDATE tbl_banco SET banco = ?, agencia = ?, conta = ? WHERE id = ?", [dados.banco, dados.agencia, dados.conta, id], callback);
    }
    
    excluir(id, callback) {
        this.connection.query("DELETE FROM tbl_banco WHERE id = ?", [id], callback);
    }
}

module.exports = () => BancoDAO;
