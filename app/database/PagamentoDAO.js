class PagamentoDAO {
    constructor(app) {
        this.connection = app.database.Database.getConnection();
    }
    
    listar(callback) {
        this.connection.query("SELECT p.id, p.valor, p.id_baixa IS NOT NULL AS baixa, CONCAT_WS(' ', u.nome, u.sobrenome) AS nome, pe.data, p.nota_fiscal AS notaFiscal FROM tbl_pagamento AS p INNER JOIN tbl_ordem_servico AS os ON os.id = p.id_ordem_servico INNER JOIN tbl_usuario AS u ON u.id = os.id_usuario INNER JOIN tbl_pedido AS pe ON pe.id_ordem_servico = os.id", callback);
    }
    
    inserirBaixa(dados, callback) {
        this.connection.query("INSERT INTO tbl_baixa_pagamento (juros, desconto, data_baixa, id_banco) VALUES (?, ?, FROM_UNIXTIME(?/1000), ?)", [dados.juros, dados.desconto, dados.dataPagamento, dados.banco.id], callback);
    }
    
    darBaixa(id, idBaixa, callback) {
        this.connection.query("UPDATE tbl_pagamento SET id_baixa = ? WHERE id = ?", [idBaixa, id], callback);
    }
}

module.exports = () => PagamentoDAO;
