//maneja que sucedera y de donde traera los recursos
const login = (req,res) => {
    req.render('login/index');
}
const signup = (req,res) => {
    req.render('login/signup');   
}

mudule.exports = {
    login,
    signup
}