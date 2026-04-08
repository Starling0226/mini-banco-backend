const User = require('../models/User.js')
const Account = require('../models/Account.js')

exports.register = async (req, res) => {
    try {
        const {nombre, email, password}= req.body

        //crear usuario
        const nuevoUsuario = await User.create({
            nombre,
            email,
            password

        })
        //crear cuenta

        const numCuenta = (Math.floor(Math.random() * 900000000) + 100000000).toString();
        await Account.create({
            numero_cuenta: numCuenta,
            userId: nuevoUsuario.id,
            tipo_cuenta: 'ahorro',
            balance: 0.00
            
        })

        res.status(201).json({
            message: "Usuario Creado",
            usuario: {nombre: nuevoUsuario.nombre, email: nuevoUsuario.email},
            cuenta: numCuenta
        })


    } catch (error) {
        console.error("Error detallado: ", error)
        res.status(400).json({error: error.message})
    }
}


