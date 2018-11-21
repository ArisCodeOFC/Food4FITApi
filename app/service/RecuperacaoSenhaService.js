const nodemailer = require("nodemailer");
const crypto = require("crypto");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "foodfourfit@gmail.com",
        pass: "codefit4"
    }
});

const codigos = {};

class RecuperacaoSenhaService {
    static enviarEmail(email, res) {
        const codigo = crypto.randomBytes(3).toString("hex");
        const opcoes = {
            from: "foodfourfit@gmail.com",
            to: email,
            subject: 'Food4FIT - Recuperação de senha',
            html: `Olá! Foi solicitado uma recuperação de senha da Food4FIT. Para prosseguir preencha o código:<br><br><h2>${codigo}</h2><br><br>no espaço apropriado.`
        };

        transporter.sendMail(opcoes, (erro, info) => {
            if (erro) {
                res.status(500).send("Erro ao enviar email");
            } else {
                codigos[email] = codigo;
                res.status(204).send("");
            }
        });
        
    }

    static verificarCodigo(email, codigo, remover=false) {
        if (codigos[email] == codigo) {
            if (remover) {
                delete codigos[email];
            }
            
            return true;
        } else {
            return false;
        }
    }
}

module.exports = () => RecuperacaoSenhaService;