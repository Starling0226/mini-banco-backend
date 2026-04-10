const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')
const authMiddleware = require('../middlewares/auth.js')



router.post('/register', userController.register);
router.post('/login', userController.login);


router.get('/perfil', authMiddleware, (req, res) => {
    res.json({
        message: "Bienvenido",
        usuario_id: req.usuario.id,
        email: req.usuario.email
    })
})

module.exports = router;