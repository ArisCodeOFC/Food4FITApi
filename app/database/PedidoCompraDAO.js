class PedidoCompraDAO {
    constructor(app) {
        this.connection = app.database.Database.getConnection();
        this.syncConnection = app.database.Database.getSyncConnection();
    }

    listar(callback) {
        this.connection.query("SELECT e.id, e.frete, e.data_emissao AS dataEmissao, e.parcelas, f.razao_social AS razaoSocial, f.id AS idFornecedor FROM tbl_emissao_compra AS e INNER JOIN tbl_fornecedor AS f ON f.id = e.id_fornecedor WHERE e.numero_nf IS NULL ORDER BY e.id ASC", (err, result) => {
            this.transformResult(result);
            let success = true;
            result.forEach(pedido => {
                if (pedido) {
                    try {
                        pedido.produtos = this.syncConnection.query("SELECT e.preco AS valorUnitario, e.quantidade, p.id, p.titulo, u.id AS idUnidadeMedida, u.sigla, u.unid_medida AS unidadeMedida FROM tbl_emissao_compra_produto AS e INNER JOIN tbl_produto AS p ON p.id = e.id_produto INNER JOIN tbl_unidade_medida AS u ON u.id = p.id_unidade_medida WHERE e.id_emissao_compra = ?", [pedido.id]);
                        pedido.produtos.map(produto => {
                             produto.unidadeMedida = {
                                id: produto.idUnidadeMedida,
                                sigla: produto.sigla,
                                unidadeMedida: produto.unidadeMedida
                            };

                            ["sigla", "idUnidadeMedida"].forEach(key => {
                                delete produto[key];
                            });
                            
                            return produto;
                        });
                        
                    } catch (error) {
                        callback(error, result);
                        success = false;
                        return;
                    }
                }
            });
            
            if (success) {
                callback(err, result);
            }
        });
    }
    
    selecionar(id, callback) {
         this.connection.query("SELECT e.id, e.frete, e.data_emissao AS dataEmissao, e.parcelas, f.razao_social AS razaoSocial, f.id AS idFornecedor FROM tbl_emissao_compra AS e INNER JOIN tbl_fornecedor AS f ON f.id = e.id_fornecedor WHERE e.id = ?", [id], (err, result) => {
            this.transformResult(result);
            let success = true;
            result.forEach(pedido => {
                if (pedido) {
                    try {
                        pedido.produtos = this.syncConnection.query("SELECT e.preco AS valorUnitario, e.quantidade, p.id, p.titulo, u.id AS idUnidadeMedida, u.sigla, u.unid_medida AS unidadeMedida FROM tbl_emissao_compra_produto AS e INNER JOIN tbl_produto AS p ON p.id = e.id_produto INNER JOIN tbl_unidade_medida AS u ON u.id = p.id_unidade_medida WHERE e.id_emissao_compra = ?", [pedido.id]);
                        pedido.produtos.map(produto => {
                             produto.unidadeMedida = {
                                id: produto.idUnidadeMedida,
                                sigla: produto.sigla,
                                unidadeMedida: produto.unidadeMedida
                            };

                            ["sigla", "idUnidadeMedida"].forEach(key => {
                                delete produto[key];
                            });
                            
                            return produto;
                        });
                        
                    } catch (error) {
                        callback(error, result);
                        success = false;
                        return;
                    }
                }
            });
            
            if (success) {
                callback(err, result);
            }
        });
    }

    inserir(dados, callback) {
        this.connection.query("INSERT INTO tbl_emissao_compra (id_fornecedor, frete, data_emissao, parcelas) VALUES (?, ?, FROM_UNIXTIME(?/1000), ?)", [dados.fornecedor.id, dados.frete, dados.dataEmissao, dados.parcelas], callback);
    }

    atualizar(id, dados, callback) {
        this.connection.query("UPDATE tbl_emissao_compra SET id_fornecedor = ?, frete = ?, data_emissao = FROM_UNIXTIME(?/1000), parcelas = ? WHERE id = ?", [dados.fornecedor.id, dados.frete, dados.dataEmissao, dados.parcelas, id], callback);
    }
    
    excluir(id, callback) {
        this.connection.query("DELETE FROM tbl_emissao_compra WHERE id = ?", [id], callback);
    }
    
    removerProdutos(id, callback) {
        this.connection.query("DELETE FROM tbl_emissao_compra_produto WHERE id_emissao_compra = ?", [id], callback);
    }
    
    associarProdutos(values, callback) {
        if (values.length) {
            this.connection.query("INSERT INTO tbl_emissao_compra_produto (id_emissao_compra, id_produto, preco, quantidade) VALUES ?", [values], callback);
        } else {
            callback(undefined, []);
        }
    }
    
    lancarNotaFiscal(id, dados, callback) {
        this.connection.query("UPDATE tbl_emissao_compra SET data_recebimento = FROM_UNIXTIME(?/1000), numero_nf = ? WHERE id = ?", [dados.dataRecebimento, dados.numeroNotaFiscal, id], callback);
    }

    transformResult(result) {
        if (result) {
            result.map(row => {
                row.fornecedor = {
                    id: row.idFornecedor,
                    razaoSocial: row.razaoSocial,
                };
                
                ["idFornecedor", "razaoSocial"].forEach(key => {
                    delete row[key];
                });

                return row;
            });
        }
    }
}

module.exports = () => PedidoCompraDAO;
