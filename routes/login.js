const express = require('express');
const view = require('../controllers/loginController')
const controller = require('../controllers/loginController')
const dashboardView = require('../controllers/dashboardController')
const checkAuthentication = require('../auth/protect')

const router = express.Router();

router.get('/', (req, res)=>{
    res.send('It works :P')
})

router.get('/register',view.registerView)
router.get('/login',view.loginView)
router.get('/dashboard', checkAuthentication, dashboardView.dashboardView)

router.post('/register', controller.registerUser)
router.post('/login', controller.loginUser)

module.exports = router