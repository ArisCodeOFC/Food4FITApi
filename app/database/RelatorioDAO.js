class RelatorioDAO {
    constructor(app) {
        this.connection = app.database.Database.getConnection();
    }
    
    listarDespesasVencidas(dataInicial, dataFinal, callback) {
        this.connection.query("SELECT id, data_emissao AS dataEmissao, data_vencimento AS dataVencimento, valor FROM tbl_despesa WHERE data_vencimento BETWEEN FROM_UNIXTIME(?/1000) AND FROM_UNIXTIME(?/1000) AND data_vencimento < NOW() AND id_despesa IS NULL ORDER BY data_vencimento ASC", [dataInicial, dataFinal], callback);
    }
    
    listarDespesasPagas(dataInicial, dataFinal, callback) {
        this.connection.query("SELECT d.id, d.data_emissao AS dataEmissao, bd.data_baixa AS dataBaixa, d.valor + bd.juros - bd.desconto AS valor FROM tbl_despesa AS d INNER JOIN tbl_baixa_despesa AS bd ON bd.id = d.id_despesa WHERE d.data_vencimento BETWEEN FROM_UNIXTIME(?/1000) AND FROM_UNIXTIME(?/1000) ORDER BY d.data_vencimento ASC", [dataInicial, dataFinal], callback);
    }
    
    listarReceitasReceber(dataInicial, dataFinal, callback) {
         this.connection.query("SELECT p.id, pe.data, p.valor, p.nota_fiscal AS notaFiscal FROM tbl_pagamento AS p INNER JOIN tbl_pedido AS pe ON pe.id_ordem_servico = p.id_ordem_servico WHERE pe.data BETWEEN FROM_UNIXTIME(?/1000) AND FROM_UNIXTIME(?/1000) AND p.id_baixa IS NULL ORDER BY pe.data ASC", [dataInicial, dataFinal], callback);
    }
    
    listarReceitasRecebidas(dataInicial, dataFinal, callback) {
         this.connection.query("SELECT p.id, pe.data, p.valor + bp.juros - bp.desconto AS valor, p.nota_fiscal AS notaFiscal, bp.data_baixa AS dataBaixa FROM tbl_pagamento AS p INNER JOIN tbl_pedido AS pe ON pe.id_ordem_servico = p.id_ordem_servico INNER JOIN tbl_baixa_pagamento AS bp ON bp.id = p.id_baixa WHERE pe.data BETWEEN FROM_UNIXTIME(?/1000) AND FROM_UNIXTIME(?/1000) ORDER BY pe.data ASC", [dataInicial, dataFinal], callback);
    }
}

module.exports = () => RelatorioDAO;