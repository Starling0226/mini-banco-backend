const User = require ('./models/User.js')
const sequelize = require('./config/database.js')

async function CrearUsuarioPrueva(){
    try {
        await sequelize.authenticate()
        const nuevoUsuario = await User.create({
            nombre:'Melvin Starlin',
            email: 'starlin@gmail.com',
            password: 'Clave2025qr'
        })

        console.log('Usuario creado: ', nuevoUsuario.toJSON(),' ', nuevoUsuario.id)
        console.log('Contraseña en el objeto (ya encriptada):', nuevoUsuario.password);

    } catch (error) {
        console.error('Error: ', error)
        
    }finally{
        await sequelize.close()
    
    }
} 

CrearUsuarioPrueva()