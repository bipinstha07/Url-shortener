const User = require('../models/user')
const {v4:uuidv4} = require('uuid')
const {setUser}= require('../service/auth')

async function handleUserSign(req,res){
    const {name,email,password} = req.body
    console.log(req.body)
    await User.create({
        name,
        email,
        password,
    })
    return res.redirect('/')
}


async function handleUserLogin(req,res){
    const {name,password} = req.body
    console.log(req.body)
    const user = await User.findOne({name,password})
   
    if(!user) return res.render('login',{error:"Invalid Username or Password"})

    // const sessionId = uuidv4(); stateful auth
    // setUser(sessionId,user) stateful auth
    const token = setUser(user)
    res.cookie('uid',token)

    return res.redirect('/')

}

async function handleLogout(req,res){
    res.clearCookie('uid');
    return res.redirect('/login');
}

module.exports = {handleUserSign,handleUserLogin,handleLogout};