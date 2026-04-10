const jwt = require('jsonwebtoken')

module.exports = ( req, res, next)=>{
    const authHeader = req.headers['authorization']
    // console.log("Heder recibido:",authHeader)
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({error: 'Acceso denegado'})
    }

    try {
        const cifrado = jwt.verify(token, process.env.JWT_SECRET)
        req.usuario = cifrado
        next();
    } catch (error) {
        res.status(403).json({error: 'Token inválido'})
    
    }
}