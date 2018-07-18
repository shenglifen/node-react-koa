const Sequelize = require('sequelize');
const sequelize = new Sequelize('user', 'root', '123', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: true,
    pool: {
        max: 5, min: 0, acquire: 30000, idle: 10000
    },
    define: {
        timestamps: false,
    },
})
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
module.exports = sequelize;