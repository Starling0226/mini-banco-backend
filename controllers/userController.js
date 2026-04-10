const User = require('../models/User.js')
const Account = require('../models/Account.js')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


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


exports.login = async (req, res) => {
    try {
        const {email, password} = req.body
        const usuario = await User.findOne({where: { email }})
        if(!usuario){
            return res.status(404).json({error: 'Usuario no encontrado'})

        }

        const esValido = await bcrypt.compare(password, usuario.password)
        if(!esValido){
            return res.status(401).json({error: 'Contraseña incorrecta'})
        }

        const token = jwt.sign(
            {id: usuario.id, email: usuario.email},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

