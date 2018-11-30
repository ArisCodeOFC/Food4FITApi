const crypto = require("crypto");

class FuncionarioDAO {
    constructor(app) {
        this.connection = app.database.Database.getConnection();
        this.syncConnection = app.database.Database.getSyncConnection();
        this.cargoDao = new app.database.CargoDAO(app);
    }
    
    login(matricula, senha = "", callback) {
        const hash = crypto.createHash("md5").update(senha).digest("hex");
        this.connection.query("SELECT id, nome, sobrenome, email, matricula, RG as rg, CPF as cpf, salario, data_nasc AS dataNascimento, genero, avatar, telefone, celular FROM tbl_funcionario WHERE matricula = ? AND senha = ?", [matricula, hash], callback);
    }
    
    selecionar(id, callback) {
        this.connection.query("SELECT f.id, f.nome, f.sobrenome, f.email, f.matricula, f.data_efetivacao AS dataAdmissao, c.cargo, d.departamento, f.avatar, f.genero, f.celular, f.telefone, f.data_nasc AS dataNascimento, f.RG AS rg, f.CPF AS cpf, f.salario, f.data_demissao AS dataDemissao, f.id_cargo AS idCargo, f.id_departamento AS idDepartamento, f.id_endereco AS idEndereco, e.logradouro, e.numero, e.bairro, e.cep, e.complemento, ci.id AS idCidade, ci.cidade, es.id AS idEstado, es.estado, es.UF as uf FROM tbl_funcionario AS f INNER JOIN tbl_cargo AS c ON c.id = f.id_cargo INNER JOIN tbl_departamento AS d ON d.id = f.id_departamento INNER JOIN tbl_endereco AS e ON e.id = f.id_endereco INNER JOIN tbl_cidade AS ci ON ci.id = e.id_cidade INNER JOIN tbl_estado AS es ON es.id = ci.id_estado WHERE f.id = ?", [id], (err, result) => {
            this.transformResult(result);
            let success = true;
            result.forEach(funcionario => {
                if (funcionario && funcionario.cargo) {
                    try {
                        funcionario.permissoes = this.syncConnection.query("SELECT p.id, p.chave, p.web, p.descricao FROM tbl_permissao_funcionario AS pf INNER JOIN tbl_permissao AS p ON p.id = pf.id_permissao WHERE pf.id_funcionario = ?", [funcionario.id]);
                        funcionario.cargo.permissoes = this.syncConnection.query("SELECT p.id, p.chave, p.web, p.descricao FROM tbl_permissao_cargo AS pc INNER JOIN tbl_permissao AS p ON p.id = pc.id_permissao WHERE pc.id_cargo = ?", [funcionario.cargo.id]);
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

    listar(callback) {
        this.connection.query("SELECT f.id, f.nome, f.sobrenome, f.email, f.matricula, f.data_efetivacao AS dataAdmissao, c.cargo, d.departamento, f.avatar, f.genero, f.celular, f.telefone, f.data_nasc AS dataNascimento, f.RG AS rg, f.CPF AS cpf, f.salario, f.data_demissao AS dataDemissao, f.id_cargo AS idCargo, f.id_departamento AS idDepartamento, f.id_endereco AS idEndereco, e.logradouro, e.numero, e.bairro, e.cep, e.complemento, ci.id AS idCidade, ci.cidade, es.id AS idEstado, es.estado, es.UF as uf FROM tbl_funcionario AS f INNER JOIN tbl_cargo AS c ON c.id = f.id_cargo INNER JOIN tbl_departamento AS d ON d.id = f.id_departamento INNER JOIN tbl_endereco AS e ON e.id = f.id_endereco INNER JOIN tbl_cidade AS ci ON ci.id = e.id_cidade INNER JOIN tbl_estado AS es ON es.id = ci.id_estado ORDER BY f.id ASC", (err, result) => {
            this.transformResult(result);
            let success = true;
            result.forEach(funcionario => {
                if (funcionario && funcionario.cargo) {
                    try {
                        funcionario.permissoes = this.syncConnection.query("SELECT p.id, p.chave, p.web, p.descricao FROM tbl_permissao_funcionario AS pf INNER JOIN tbl_permissao AS p ON p.id = pf.id_permissao WHERE pf.id_funcionario = ?", [funcionario.id]);
                        funcionario.cargo.permissoes = this.syncConnection.query("SELECT p.id, p.chave, p.web, p.descricao FROM tbl_permissao_cargo AS pc INNER JOIN tbl_permissao AS p ON p.id = pc.id_permissao WHERE pc.id_cargo = ?", [funcionario.cargo.id]);
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
        this.connection.query("INSERT INTO tbl_funcionario (nome, sobrenome, CPF, RG, data_nasc, data_efetivacao, ativo, email, matricula, senha, avatar, salario, genero, celular, telefone, id_cargo, id_departamento, id_endereco) VALUES (?, ?, ?, ?, FROM_UNIXTIME(?/1000), FROM_UNIXTIME(?/1000), false, ?, ?, '', ?, ?, ?, ?, ?, ?, ?, ?)", [dados.nome, dados.sobrenome, dados.cpf, dados.rg, dados.dataNascimento, dados.dataAdmissao, dados.email, dados.matricula, dados.avatar, dados.salario, dados.genero, dados.celular, dados.telefone, dados.cargo.id, dados.departamento.id, dados.endereco.id], callback);
    }
    
    atualizar(id, dados, callback) {
        this.connection.query("UPDATE tbl_funcionario SET nome = ?, sobrenome = ?, CPF = ?, RG = ?, data_nasc = FROM_UNIXTIME(?/1000), data_efetivacao = FROM_UNIXTIME(?/1000), email = ?, matricula = ?, avatar = ?, salario = ?, genero = ?, celular = ?, telefone = ?, id_cargo = ?, id_departamento = ? WHERE id = ?", [dados.nome, dados.sobrenome, dados.cpf, dados.rg, dados.dataNascimento, dados.dataAdmissao, dados.email, dados.matricula, dados.avatar, dados.salario, dados.genero, dados.celular, dados.telefone, dados.cargo.id, dados.departamento.id, id], callback);
    }
    
    atualizarDadosLogin(id, dados, callback) {
        if (dados.senha) {
            const hash = crypto.createHash("md5").update(dados.senha).digest("hex");
            this.connection.query("UPDATE tbl_funcionario SET senha = ? WHERE id = ?", [hash, id], callback);
        } else {
            callback(undefined, []);
        }
    }
    
    excluir(id, callback) {
        this.connection.query("DELETE FROM tbl_funcionario WHERE id = ?", [id], callback);
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
                
                row.departamento = {
                    id: row.idDepartamento,
                    departamento: row.departamento
                };
                
                row.cargo = {
                    id: row.idCargo,
                    cargo: row.cargo
                };
                
                ["cidade", "estado", "logradouro", "idEstado", "idCidade", "complemento", "numero", "cep", "bairro", "uf", "idEndereco", "idCargo", "idDepartamento"].forEach(key => {
                    delete row[key];
                });

                return row;
            });
        }
    }
}

module.exports = () => FuncionarioDAO;
