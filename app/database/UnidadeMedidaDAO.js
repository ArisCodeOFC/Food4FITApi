class UnidadeMedidaDAO {
    constructor(app) {
        this.connection = app.database.Database.getConnection();
    }
    
    listar(callback) {
        this.connection.query("SELECT id, sigla, unid_medida AS unidadeMedida FROM tbl_unidade_medida", callback);
    }
}

module.exports = () => UnidadeMedidaDAO;