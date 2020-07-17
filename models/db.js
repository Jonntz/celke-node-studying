//Toda query sql deve ser passada por aspas duplas
//Os valores serão passados com aspas simples
const Sequelize = require('sequelize');

//criando conexão
const sequelize = new Sequelize('celke', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};