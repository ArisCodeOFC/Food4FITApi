class DepartamentoDAO {
    constructor(app) {
        this.connection = app.database.Database.getConnection();
    }
    
    listar(callback) {
        this.connection.query("SELECT id, departamento FROM tbl_departamento", callback);
    }
}

module.exports = () => DepartamentoDAO;
