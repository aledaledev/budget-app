const express = require('express')
const { engine } = require('express-handlebars')
const myconnection = require('express-myconnection')
const mysql = require('mysql')
const session = require('express-session')
const bodyParser = require('body-parser')

const app = express()
app.set('port', 4000);

app.set('views', __dirname + '/views');
app.engine('.hbs', engine({extname:'.hbs'}))
app.set('view engine','.hbs')
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/../public'));

app.use(myconnection(mysql, {
    hots:'localhost',
    user:'root',
    password:'QQuuaa123789@',
    port:3306,
    database:'nodelogin'
}))

app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true,
}))

app.listen(app.get('port'),()=>{
    console.log(`Listening on port ${app.get('port')}`);
})

app.get('/', (req,res) => {
    res.render('home')
})