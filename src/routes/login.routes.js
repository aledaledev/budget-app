const express = require('express');
const {login, signup} = require('../controllers/login.controller')

const routerLogin = express.Router()

//maneja dirrecciones y el verbo a ejecutarse en la app 
routerLogin.get('/login',login)
routerLogin.get('/signup',signup)

module.exports = routerLogin