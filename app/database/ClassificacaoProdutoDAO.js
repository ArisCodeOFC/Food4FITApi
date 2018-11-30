class ClassificacaoProdutoDAO {
    constructor(app) {
        this.connection = app.database.Database.getConnection();
    }
    
    listar(callback) {
        this.connection.query("SELECT id, titulo FROM tbl_classificacao_produto", callback);
    }
    
    selecionar(id, callback) {
        this.connection.query("SELECT id, titulo FROM tbl_classificacao_produto WHERE id = ?", [id], callback);
    }
    
    inserir(dados, callback) {
        this.connection.query("INSERT INTO tbl_classificacao_produto (titulo) VALUES (?)", [dados.titulo], callback);
    }
    
    atualizar(id, dados, callback) {
        this.connection.query("UPDATE tbl_classificacao_produto SET titulo = ? WHERE id = ?", [dados.titulo, id], callback);
    }
    
    excluir(id, callback) {
        this.connection.query("DELETE FROM tbl_classificacao_produto WHERE id = ?", [id], callback);
    }
}

module.exports = () => ClassificacaoProdutoDAO;
