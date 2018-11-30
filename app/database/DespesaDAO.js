class DespesaDAO {
    constructor(app) {
        this.connection = app.database.Database.getConnection();
    }
    
    listar(callback) {
        this.connection.query("SELECT d.id, d.descricao, d.data_emissao AS dataEmissao, d.data_vencimento AS dataVencimento, d.valor, f.nome AS nomeFuncionario, f.sobrenome AS sobrenomeFuncionario, fo.razao_social AS razaoSocial FROM tbl_despesa AS d LEFT JOIN tbl_funcionario AS f ON d.id_funcionario = f.id LEFT JOIN tbl_fornecedor AS fo ON d.id_fornecedor = fo.id ORDER BY d.id ASC", (err, result) => {
            this.transformResult(result);
            callback(err, result);
        });
    }

    transformResult(result) {
        if (result) {
            result.map(row => {
                if (row.sobrenomeFuncionario) {
                    row.funcionario = {
                        nome: row.nomeFuncionario,
                        sobrenome: row.sobrenomeFuncionario
                    };
                    
                } else {
                    row.fornecedor = {
                        razaoSocial: row.razaoSocial
                    }
                }
                
                ["sobrenomeFuncionario", "razaoSocial", "nomeFuncionario"].forEach(key => {
                    delete row[key];
                });

                return row;
            });
        }
    }
}

module.exports = () => DespesaDAO;
