class FluxoCaixaDAO {
    constructor(app) {
        this.connection = app.database.Database.getConnection();
    }
    
    listar(dataInicial, dataFinal, callback) {
        this.connection.query("SELECT TRUNCATE(IFNULL(SUM(d.valor), 0), 2) AS saida, TRUNCATE(IFNULL(SUM(p.valor), 0), 2) AS entrada, d.data_vencimento AS data FROM tbl_despesa AS d LEFT JOIN tbl_pedido AS pe ON DATE(pe.data) = d.data_vencimento LEFT JOIN tbl_pagamento AS p ON p.id_ordem_servico = pe.id_ordem_servico WHERE d.data_vencimento BETWEEN FROM_UNIXTIME(?/1000) AND FROM_UNIXTIME(?/1000) GROUP BY d.data_vencimento UNION SELECT TRUNCATE(IFNULL(SUM(d.valor), 0), 2) As saida, TRUNCATE(IFNULL(SUM(p.valor), 0), 2) AS entrada, DATE(pe.data) AS data FROM tbl_despesa AS d RIGHT JOIN tbl_pedido AS pe ON DATE(pe.data) = d.data_vencimento RIGHT JOIN tbl_pagamento AS p ON p.id_ordem_servico = pe.id_ordem_servico WHERE pe.data BETWEEN FROM_UNIXTIME(?/1000) AND FROM_UNIXTIME(?/1000) GROUP BY DATE(pe.data) ORDER BY data ASC", [dataInicial, dataFinal, dataInicial, dataFinal], callback);
    }
}

module.exports = () => FluxoCaixaDAO;