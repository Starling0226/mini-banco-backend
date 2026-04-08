const {DataTypes} = require('sequelize')
const sequelize  = require('../config/database')


const Transaction = sequelize.define('transaction', {
    id: {
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey: true
    },
    monto: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false
        
    },
    tipo: {  
        type: DataTypes.ENUM('deposito', 'retiro', 'transferencia'),
        allowNull: false
    
    },
    cuenta_origen_id: {
        type: DataTypes.UUID,
        
    },
    cuenta_destino_id: {
        type: DataTypes.UUID,
        
    
    

    }




        
});

module.exports = Transaction;