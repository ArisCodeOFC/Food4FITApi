class ConciliacaoBancariaDAO {
    constructor(app) {
        this.connection = app.database.Database.getConnection();
    }
    
    listar(idBanco, callback) {
        this.connection.query("SELECT bd.id, d.valor + bd.juros - bd.desconto AS valor, bd.data_baixa AS data, 0 AS tipo, bd.conciliado FROM tbl_baixa_despesa AS bd INNER JOIN tbl_despesa AS d ON d.id_despesa = bd.id WHERE bd.id_banco = ? UNION SELECT bp.id, p.valor + bp.juros - bp.desconto AS valor, bp.data_baixa AS data, 1 AS tipo, bp.conciliado FROM tbl_baixa_pagamento AS bp INNER JOIN tbl_pagamento AS p ON p.id_baixa = bp.id WHERE bp.id_banco = ? ORDER BY data ASC", [idBanco, idBanco], callback);
    }
    
    conciliar(tipo, id, callback) {
        if (tipo == 0) {
            this.connection.query("UPDATE tbl_baixa_despesa SET conciliado = !conciliado WHERE id = ?", [id], callback);
        } else {
            this.connection.query("UPDATE tbl_baixa_pagamento SET conciliado = !conciliado WHERE id = ?", [id], callback);
        }
    }
}

module.exports = () => ConciliacaoBancariaDAO;