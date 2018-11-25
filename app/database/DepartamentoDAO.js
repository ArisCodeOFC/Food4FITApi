class DepartamentoDAO {
    constructor(app) {
        this.connection = app.database.Database.getConnection();
    }
    
    listar(callback) {
        this.connection.query("SELECT id, departamento FROM tbl_departamento", callback);
    }
    
    selecionar(id, callback) {
        this.connection.query("SELECT id, departamento FROM tbl_departamento WHERE id = ?", [id], callback);
    }
    
    inserir(dados, callback) {
        this.connection.query("INSERT INTO tbl_departamento (departamento) VALUES (?)", [dados.departamento], callback);
    }
    
    atualizar(id, dados, callback) {
        this.connection.query("UPDATE tbl_departamento SET departamento = ? WHERE id = ?", [dados.departamento, id], callback);
    }
    
    excluir(id, callback) {
        this.connection.query("DELETE FROM tbl_departamento WHERE id = ?", [id], callback);
    }
}

module.exports = () => DepartamentoDAO;
