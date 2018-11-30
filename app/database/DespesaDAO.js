class DespesaDAO {
    constructor(app) {
        this.connection = app.database.Database.getConnection();
    }
    
    listar(callback) {
        this.connection.query("SELECT d.id, d.descricao, d.data_emissao AS dataEmissao, d.data_vencimento AS dataVencimento, d.valor, f.id AS idFuncionario, f.nome AS nomeFuncionario, f.sobrenome AS sobrenomeFuncionario, fo.id AS idFornecedor, fo.razao_social AS razaoSocial FROM tbl_despesa AS d LEFT JOIN tbl_funcionario AS f ON d.id_funcionario = f.id LEFT JOIN tbl_fornecedor AS fo ON d.id_fornecedor = fo.id ORDER BY d.id ASC", (err, result) => {
            this.transformResult(result);
            callback(err, result);
        });
    }
    
    selecionar(id, callback) {
        this.connection.query("SELECT d.id, d.descricao, d.data_emissao AS dataEmissao, d.data_vencimento AS dataVencimento, d.valor, f.id AS idFuncionario, f.nome AS nomeFuncionario, f.sobrenome AS sobrenomeFuncionario, fo.id AS idFornecedor, fo.razao_social AS razaoSocial FROM tbl_despesa AS d LEFT JOIN tbl_funcionario AS f ON d.id_funcionario = f.id LEFT JOIN tbl_fornecedor AS fo ON d.id_fornecedor = fo.id WHERE d.id = ?", [id], (err, result) => {
            this.transformResult(result);
            callback(err, result);
        });
    }
    
    inserir(dados, callback) {
        this.connection.query("INSERT INTO tbl_despesa (descricao, data_emissao, data_vencimento, valor, id_funcionario, id_fornecedor) VALUES (?, FROM_UNIXTIME(?/1000), FROM_UNIXTIME(?/1000), ?, ?, ?)", [dados.descricao, dados.dataEmissao, dados.dataVencimento, dados.valor, dados.funcionario ? dados.funcionario.id : null, dados.fornecedor ? dados.fornecedor.id : null], callback);
    }
    
    atualizar(id, dados, callback) {
        this.connection.query("UPDATE tbl_despesa SET descricao = ?, data_emissao = FROM_UNIXTIME(?/1000), data_vencimento = FROM_UNIXTIME(?/1000), valor = ?, id_funcionario = ?, id_fornecedor = ? WHERE id = ?", [dados.descricao, dados.dataEmissao, dados.dataVencimento, dados.valor, dados.funcionario ? dados.funcionario.id : null, dados.fornecedor ? dados.fornecedor.id : null, id], callback);
    }
    
    excluir(id, callback) {
        this.connection.query("DELETE FROM tbl_despesa WHERE id = ?", [id], callback);
    }

    transformResult(result) {
        if (result) {
            result.map(row => {
                if (row.sobrenomeFuncionario) {
                    row.funcionario = {
                        id: row.idFuncionario,
                        nome: row.nomeFuncionario,
                        sobrenome: row.sobrenomeFuncionario
                    };
                    
                } else {
                    row.fornecedor = {
                        id: row.idFornecedor,
                        razaoSocial: row.razaoSocial
                    }
                }
                
                ["sobrenomeFuncionario", "razaoSocial", "nomeFuncionario", "idFuncionario", "idFornecedor"].forEach(key => {
                    delete row[key];
                });

                return row;
            });
        }
    }
}

module.exports = () => DespesaDAO;
