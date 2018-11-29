class EstadoDAO {
    constructor(app) {
        this.connection = app.database.Database.getConnection();
    }
    
    listar(callback) {
        this.connection.query("SELECT id, estado, UF as uf FROM tbl_estado", callback);
    }
    
    listarCidades(idEstado, callback) {
        this.connection.query("SELECT id, cidade FROM tbl_cidade WHERE id_estado = ?", [idEstado], callback);
    }
}

module.exports = () => EstadoDAO;
