const express = require('express');
const {login, signup, storeUser, authUser, logout} = require('../controllers/login.controller')

const routerLogin = express.Router()

//maneja dirrecciones y el verbo a ejecutarse en la app 
routerLogin.get('/login',login)
routerLogin.post('/login',authUser)
routerLogin.get('/signup',signup)
routerLogin.post('/signup',storeUser)
routerLogin.get('/logout',logout)

module.exports = routerLogin