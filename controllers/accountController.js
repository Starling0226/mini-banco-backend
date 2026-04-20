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

exports.transfer = async (req, res) => {
    const t = await sequelize.transaction()

    try {
        const {numero_cuenta_destino, monto} = req.body;

        if (!monto || monto <= 0){
            return res.status(400).json({ error: "Monto invalido"})
        }

        const cuenta_origen = await Account.findOne({
            where: {userId: req.usuario.id},
            transaction: t        
        })

        if(parseFloat(cuenta_origen.balance)<parseFloat(monto) ){
            await t. rollback()
            return res.status(400).json({error: "Saldo insuficiente"})
        
        }

        const cuenta_destino = await Account.findOne({
            where: {numero_cuenta: numero_cuenta_destino},
            transaction: t
        })

        if (!cuenta_destino) {
            await t.rollback()
            return res.status(400).json({error: "Cuenta destino no encontrada"})
                   
        }

        cuenta_origen.balance = parseFloat(cuenta_origen.balance) - parseFloat(monto)
        cuenta_destino.balance = parseFloat(cuenta_destino.balance) + parseFloat(monto)

        await cuenta_origen.save({transaction: t})
        await cuenta_destino.save({transaction: t})

        await Transaction.create({
            monto,
            tipo: 'transferencia',
            cuenta_origen_id: cuenta_origen.id,
            cuenta_destino_id: cuenta_destino.id
            
        },{Transaction: t});

        await t.commit()

        res.json({
            message: 'Transferencia exitosa',
            balance_origen: cuenta_origen.balance,                  
        })


    } catch (error) {
        await t.rollback()
        res.status(500).json({error: error.message})
    
    }
}