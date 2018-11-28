class PermissaoDAO {
    constructor(app) {
        this.connection = app.database.Database.getConnection();
    }
    
    listar(callback) {
        this.connection.query("SELECT id, descricao, chave, web FROM tbl_permissao", callback);
    }
}

module.exports = () => PermissaoDAO;
