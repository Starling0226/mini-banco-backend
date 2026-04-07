const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,
        logging: false

    }
)

async function correrservidor() {
    try {
        await sequelize.authenticate();
        console.log('conectado a la db');
    } catch (error) {

        console.error('no se pudo conectar', error);
        
    }
    
}

correrservidor()