class CargoDAO {
    constructor(app) {
        this.connection = app.database.Database.getConnection();
    }
    
    listar(callback) {
        this.connection.query("SELECT id, cargo FROM tbl_cargo", callback);
    }
}

module.exports = () => CargoDAO;
