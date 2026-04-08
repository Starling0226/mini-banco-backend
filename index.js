const sequelize = require('./config/database.js')
const User = require('./models/User.js')
const Account = require('./models/Account.js')
const Transaction = require('./models/Transaction.js')

//  Relaciones

User.hasMany(Account,{foreignKey: 'userid'});
Account.belongsTo(User,{foreignKey: 'userid'});

Account.hasMany(Transaction,{foreignKey: 'cuenta_origen_id', as: 'enviadas'});
Account.hasMany(Transaction,{foreignKey: 'cuenta_destino_id', as: 'recibidas'});

Transaction.belongsTo(Account,{foreignKey: 'cuenta_origen_id', as: 'origen'});
Transaction.belongsTo(Account,{foreignKey: 'cuenta_destino_id', as: 'destino'})


async function syncDB() {
    try {
        await sequelize.authenticate()
        console.log('Concexion estableidad')
        await sequelize.sync({alter:true})
        console.log('Tablas sincronizadas')
    } catch (error) {
        console.error('Error: ', error)
        
    }
    
}
syncDB()