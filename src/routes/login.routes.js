const express = require('express');
const {login, signup, storeUser, authUser} = require('../controllers/login.controller')

const routerLogin = express.Router()

//maneja dirrecciones y el verbo a ejecutarse en la app 
routerLogin.get('/login',login)
routerLogin.post('/login',authUser)
routerLogin.get('/signup',signup)
routerLogin.post('/signup',storeUser)

module.exports = routerLogin