class EnderecoDAO {
    constructor(app) {
        this.connection = app.database.Database.getConnection();
    }

    inserir(dados, callback) {
        this.connection.query("INSERT INTO tbl_endereco (id_cidade, logradouro, numero, bairro, cep, complemento) VALUES (?, ?, ?, ?, ?, ?)", [dados.idCidade, dados.logradouro, dados.numero, dados.bairro, dados.cep, dados.complemento], callback);
    }
}

module.exports = () => EnderecoDAO;
