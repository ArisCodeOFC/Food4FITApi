class PermissaoDAO {
    constructor(app) {
        this.connection = app.database.Database.getConnection();
    }
    
    listar(callback) {
        this.connection.query("SELECT id, descricao, chave, web FROM tbl_permissao", callback);
    }
    
    listarPermissoesCargo(idCargo, callback) {
        this.connection.query("SELECT p.id, p.chave, p.web, p.descricao FROM tbl_permissao_cargo AS pc INNER JOIN tbl_permissao AS p ON p.id = pc.id_permissao WHERE pc.id_cargo = ?", [idCargo], callback);
    }
    
    removerPermissoesCargo(idCargo, callback) {
        this.connection.query("DELETE FROM tbl_permissao_cargo WHERE id_cargo = ?", [idCargo], callback);
    }
    
    associarCargo(values, callback) {
        if (values.length) {
            this.connection.query("INSERT INTO tbl_permissao_cargo (id_permissao, id_cargo) VALUES ?", [values], callback);
        } else {
            callback(undefined, []);
        }
    }
    
    removerPermissoesFuncionario(idFuncionario, callback) {
        this.connection.query("DELETE FROM tbl_permissao_funcionario WHERE id_funcionario = ?", [idFuncionario], callback);
    }
    
    associarFuncionario(values, callback) {
        if (values.length) {
            this.connection.query("INSERT INTO tbl_permissao_funcionario (id_permissao, id_funcionario) VALUES ?", [values], callback);
        } else {
            callback(undefined, []);
        }
    }
}

module.exports = () => PermissaoDAO;
