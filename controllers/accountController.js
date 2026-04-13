const Account = require('../models/Account.js')
const Transaction = require('../models/Transaction.js')
const sequelize = require('../config/database.js')
const { or } = require('sequelize')





// consultar balance
exports.getBalance= async (req, res)=>{
    try {
        const cuenta = await Account.findOne({
            where: {userId: req.usuario.id}
        })

        if (!cuenta) {
            return res.status(400).json({error: "Cuenta no encontrada"})
        }
        res.json({
            // nombre_usuario: res.usuario.nombre,
            email_usuario: req.usuario.email,
            numero_cuenta: cuenta.numero_cuenta,
            tipo_cuenta: cuenta.tipo_cuenta,
            balance: cuenta.balance
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


// depositar

exports.deposit = async (req, res) => {
    const t = await sequelize.transaction()
    try {
        const {monto} = req.body;
        if (!monto || monto <= 0) {
            return res.status(400).json({error: "Monto invalido"})
                    
        }

        const cuenta = await Account.findOne({
            where: {
                userId: req.usuario.id
            }
        })

        if (!cuenta) {
        throw new Error("Cuenta no encontrada");
        }

        cuenta.balance = parseFloat(cuenta.balance) + parseFloat(monto);
        await cuenta.save({ transaction:t})


        await Transaction.create({
            monto,
            tipo: 'deposito',
            cuenta_destino_id: cuenta.id,                
            
        }, {transaction: t})
        await t.commit()

        res.json({
            message: "Deposito exitoso",
            balance: cuenta.balance

        })


    } catch (error) {
        
        await t.rollback()
        res.status(500).json({error: error.message})
    
    }



}