class TipoPagamentoDAO {
    constructor(app) {
        this.connection = app.database.Database.getConnection();
    }
    
    listar(callback) {
        this.connection.query("SELECT id, forma FROM tbl_tipo_pagamento", callback);
    }
}

module.exports = () => TipoPagamentoDAO;