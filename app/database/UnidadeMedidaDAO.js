class UnidadeMedidaDAO {
    constructor(app) {
        this.connection = app.database.Database.getConnection();
    }
    
    listar(callback) {
        this.connection.query("SELECT id, sigla, unid_medida AS unidadeMedida FROM tbl_unidade_medida", callback);
    }
    
    selecionar(id, callback) {
        this.connection.query("SELECT id, sigla, unid_medida AS unidadeMedida FROM tbl_unidade_medida WHERE id = ?", [id], callback);
    }
    
    inserir(dados, callback) {
        this.connection.query("INSERT INTO tbl_unidade_medida (unid_medida, sigla) VALUES (?, ?)", [dados.unidadeMedida, dados.sigla], callback);
    }
    
    atualizar(id, dados, callback) {
        this.connection.query("UPDATE tbl_unidade_medida SET unid_medida = ?, sigla = ? WHERE id = ?", [dados.unidadeMedida, dados.sigla, id], callback);
    }
    
    excluir(id, callback) {
        this.connection.query("DELETE FROM tbl_unidade_medida WHERE id = ?", [id], callback);
    }
}

module.exports = () => UnidadeMedidaDAO;