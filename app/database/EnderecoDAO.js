class EnderecoDAO {
    constructor(app) {
        this.connection = app.database.Database.getConnection();
    }

    inserir(dados, callback) {
        this.connection.query("INSERT INTO tbl_endereco (id_cidade, logradouro, numero, bairro, cep, complemento) VALUES (?, ?, ?, ?, ?, ?)", [dados.cidade.id, dados.logradouro, dados.numero, dados.bairro, dados.cep, dados.complemento], callback);
    }
    
    atualizar(id, dados, callback) {
        this.connection.query("UPDATE tbl_endereco SET id_cidade = ?, logradouro = ?, numero = ?, bairro = ?, cep = ?, complemento = ? WHERE id = ?", [dados.cidade.id, dados.logradouro, dados.numero, dados.bairro, dados.cep, dados.complemento, id], callback);
    }
}

module.exports = () => EnderecoDAO;
