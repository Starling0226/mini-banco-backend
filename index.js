const express = require('express')
const app = express()
app.use(express.json())

const sequelize = require('./config/database.js')
const userRouter = require('./routes/userRoutes.js')

const User = require('./models/User.js')
const Account = require('./models/Account.js')
const Transaction = require('./models/Transaction.js')

require('dotenv').config();


User.hasMany(Account,{foreignKey: 'userId'});
Account.belongsTo(User,{foreignKey: 'userId'});

app.use('/api/users', userRouter)

const PORT = process.env.PORT || 3000

async function startServer() {
    try {
        await sequelize.sync();
        
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`)
        })
        

    } catch (error) {
        console.error('Error: ', error)
    }
}

startServer()

