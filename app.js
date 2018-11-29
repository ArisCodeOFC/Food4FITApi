const app = require("./config/express")();
const http = require("http").Server(app);

const porta = process.env.PORT || 3000;
http.listen(porta, function() {
    console.log(`Servidor rodando na porta ${porta}.`);
});