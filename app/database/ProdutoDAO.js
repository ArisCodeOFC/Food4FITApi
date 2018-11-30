class ProdutoDAO {
    constructor(app) {
        this.connection = app.database.Database.getConnection();
    }
    
    listar(callback) {
        this.connection.query("SELECT p.id, p.titulo, p.descricao, cp.id AS idClassificacao, cp.titulo AS classificacao, u.id AS idUnidadeMedida, u.sigla, u.unid_medida AS unidadeMedida FROM tbl_produto AS p INNER JOIN tbl_classificacao_produto AS cp ON cp.id = p.id_classificacao_produto INNER JOIN tbl_unidade_medida AS u ON u.id = p.id_unidade_medida ORDER BY p.id ASC", (err, result) => {
            this.transformResult(result);
            callback(err, result);
        });
    }
    
    selecionar(id, callback) {
        this.connection.query("SELECT p.id, p.titulo, p.descricao, cp.id AS idClassificacao, cp.titulo AS classificacao, u.id AS idUnidadeMedida, u.sigla, u.unid_medida AS unidadeMedida FROM tbl_produto AS p INNER JOIN tbl_classificacao_produto AS cp ON cp.id = p.id_classificacao_produto INNER JOIN tbl_unidade_medida AS u ON u.id = p.id_unidade_medida WHERE p.id = ?", [id], (err, result) => {
            this.transformResult(result);
            callback(err, result);
        });
    }
    
    inserir(dados, callback) {
        this.connection.query("INSERT INTO tbl_produto (titulo, descricao, id_classificacao_produto, id_unidade_medida) VALUES (?, ?, ?, ?)", [dados.titulo, dados.descricao, dados.classificacao.id, dados.unidadeMedida.id], callback);
    }
    
    atualizar(id, dados, callback) {
        this.connection.query("UPDATE tbl_produto SET titulo = ?, descricao = ?, id_classificacao_produto = ?, id_unidade_medida = ? WHERE id = ?", [dados.titulo, dados.descricao, dados.classificacao.id, dados.unidadeMedida.id, id], callback);
    }
    
    excluir(id, callback) {
        this.connection.query("DELETE FROM tbl_produto WHERE id = ?", [id], callback);
    }

    transformResult(result) {
        if (result) {
            result.map(row => {
                row.unidadeMedida = {
                    id: row.idUnidadeMedida,
                    sigla: row.sigla,
                    unidadeMedida: row.unidadeMedida
                };

                row.classificacao = {
                    id: row.idClassificacao,
                    titulo: row.classificacao
                };
                
                ["idClassificacao", "sigla", "idUnidadeMedida"].forEach(key => {
                    delete row[key];
                });

                return row;
            });
        }
    }
}

module.exports = () => ProdutoDAO;
