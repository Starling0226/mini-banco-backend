// const {DataTypes} = require('sequelize')
// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         host: process.env.DB_HOST,
//         dialect: 'postgres',
//         port: process.env.DB_PORT,
//         logging: false

//     }
// )

consttransaction = sequelize.define('transaction', {
    id: {
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey: true
    },
    monto: {

    }

        
    })