const db = require('./db');

// Cria os atributos da tabela
const Pagamentos = db.sequelize.define('pagamentos', {
    nome: {
        type: db.Sequelize.STRING
    },
    valor: {
        type: db.Sequelize.DOUBLE
    }
});

// Cria a tabela e a paga a tabela caso já exista uma, esse comando deve ser rodado somente uma vez e depois comentado
// Pagamento.sync({force: true});

module.exports = Pagamentos;