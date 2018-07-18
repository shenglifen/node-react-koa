const Sequelize = require('sequelize')
const sequelize = require('./index')
const User = sequelize.define('userinfos', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, unique: true},
    username: {type: Sequelize.STRING},
    age: {type: Sequelize.INTEGER},
    address: {type: Sequelize.STRING},
    isdelete: {type: Sequelize.INTEGER, allowNull: true}//软删除 0为未删除，1为删除
});
module.exports = User;