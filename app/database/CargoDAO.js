class CargoDAO {
    constructor(app) {
        this.connection = app.database.Database.getConnection();
        this.permissaoDao = new app.database.PermissaoDAO(app);
    }
    
    listar(callback) {
        this.connection.query("SELECT id, cargo FROM tbl_cargo", (err, result) => {
            this.listarPermissoes(err, result, callback);
        });
    }
    
    selecionar(id, callback) {
        this.connection.query("SELECT id, cargo FROM tbl_cargo WHERE id = ?", [id], (err, result) => {
            this.listarPermissoes(err, result, callback);
        });
    }
    
    inserir(dados, callback) {
        this.connection.query("INSERT INTO tbl_cargo (cargo) VALUES (?)", [dados.cargo], callback);
    }
    
    atualizar(id, dados, callback) {
        this.connection.query("UPDATE tbl_cargo SET cargo = ? WHERE id = ?", [dados.cargo, id], callback);
    }
    
    excluir(id, callback) {
        this.connection.query("DELETE pc, c FROM tbl_cargo AS c INNER JOIN tbl_permissao_cargo AS pc ON pc.id_cargo = c.id WHERE c.id = ?", [id], callback);
    }
    
    listarPermissoes(erro, cargos, callback) {
        let pendente = cargos.length; 
        if (pendente == 0) {
            callback(erro, cargos);
        } else {
            cargos.forEach(cargo => {
                cargo.permissoes = [];
                this.permissaoDao.listarPermissoesCargo(cargo.id, (err, result) => {
                    if (result) {
                        cargo.permissoes = result;
                    }

                    if (--pendente == 0) {
                        callback(erro, cargos);
                    }
                });
            });
        }
    }
}

module.exports = () => CargoDAO;
