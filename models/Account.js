const {DataTypes} = require('sequelize')
const sequelize = require('../config/database')

const Account = sequelize.define('account', {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    numero_cuenta: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    
    },
    balance: {
        type: DataTypes.DECIMAL(20, 2),
        defaultValue: 0.00
    
    
    },
    tipo_cuenta: {
        type: DataTypes.ENUM('ahorro', 'corriente'),
        defaultValue: 'ahorro'
    }
   
    


})

module.exports = Account;