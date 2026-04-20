const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController.js');
const authMiddleware = require('../middlewares/auth.js')


router.get('/balance',authMiddleware, accountController.getBalance);
router.post('/deposit',authMiddleware, accountController.deposit);
router.post('/transfer',authMiddleware, accountController.transfer)

module.exports = router;

