class FornecedorDAO {
    constructor(app) {
        this.connection = app.database.Database.getConnection();
    }
    
    selecionar(id, callback) {
        this.connection.query("SELECT f.id, f.id_endereco AS idEndereco, f.insc_estadual AS inscricaoEstadual, f.email, f.representante, f.razao_social AS razaoSocial, f.nome_fantasia AS nomeFantasia, f.telefone, f.cnpj, f.observacao, e.logradouro, e.numero, e.bairro, e.cep, e.complemento, c.id AS idCidade, c.cidade, es.id AS idEstado, es.estado, es.UF AS uf FROM tbl_fornecedor AS f INNER JOIN tbl_endereco AS e ON f.id_endereco = e.id INNER JOIN tbl_cidade AS c ON c.id = e.id_cidade INNER JOIN tbl_estado AS es ON es.id = c.id_estado WHERE f.id = ?", [id], (err, result) => {
            this.transformResult(result);
            callback(err, result);
        });
    }

    listar(callback) {
        this.connection.query("SELECT f.id, f.id_endereco AS idEndereco, f.insc_estadual AS inscricaoEstadual, f.email, f.representante, f.razao_social AS razaoSocial, f.nome_fantasia AS nomeFantasia, f.telefone, f.cnpj, f.observacao, e.logradouro, e.numero, e.bairro, e.cep, e.complemento, c.id AS idCidade, c.cidade, es.id AS idEstado, es.estado, es.UF AS uf FROM tbl_fornecedor AS f INNER JOIN tbl_endereco AS e ON f.id_endereco = e.id INNER JOIN tbl_cidade AS c ON c.id = e.id_cidade INNER JOIN tbl_estado AS es ON es.id = c.id_estado ORDER BY f.id ASC", (err, result) => {
            this.transformResult(result);
            callback(err, result);
        });
    }

    inserir(dados, callback) {
        this.connection.query("INSERT INTO tbl_fornecedor (id_endereco, insc_estadual, email, representante, razao_social, nome_fantasia, telefone, cnpj, observacao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [dados.endereco.id, dados.inscricaoEstadual, dados.email, dados.representante, dados.razaoSocial, dados.nomeFantasia, dados.telefone, dados.cnpj, dados.observacao], callback);
    }
    
    atualizar(id, dados, callback) {
        this.connection.query("UPDATE tbl_fornecedor SET insc_estadual = ?, email = ?, representante = ?, razao_social = ?, nome_fantasia = ?, telefone = ?, cnpj = ?, observacao = ? WHERE id = ?", [dados.inscricaoEstadual, dados.email, dados.representante, dados.razaoSocial, dados.nomeFantasia, dados.telefone, dados.cnpj, dados.observacao, id], callback);
    }
    
    excluir(id, callback) {
        this.connection.query("DELETE FROM tbl_fornecedor WHERE id = ?", [id], callback);
    }

    transformResult(result) {
        if (result) {
            result.map(row => {
                row.endereco = {
                    id: row.idEndereco,
                    logradouro: row.logradouro,
                    complemento: row.complemento,
                    numero: row.numero,
                    cep: row.cep,
                    bairro: row.bairro,
                    cidade: {
                        cidade: row.cidade,
                        id: row.idCidade
                    },
                    estado: {
                        estado: row.estado,
                        id: row.idEstado,
                        uf: row.uf
                    }
                };
                
                ["cidade", "estado", "logradouro", "idEstado", "idCidade", "complemento", "numero", "cep", "bairro", "uf", "idEndereco"].forEach(key => {
                    delete row[key];
                });

                return row;
            });
        }
    }
}

module.exports = () => FornecedorDAO;
