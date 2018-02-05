const Sequelize = require('sequelize');
const sequelize = new Sequelize('epc', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false
});
module.exports = sequelize;