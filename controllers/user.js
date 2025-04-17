const User = require('../models/user')
const {v4:uuidv4} = require('uuid')
const {setUser}= require('../service/auth')

async function handleUserSign(req,res){
    const {name,email,password,role} = req.body
    console.log(req.body)
    await User.create({
        name,
        email,
        password,
        role,
    })
    return res.redirect('/')
}


async function handleUserLogin(req,res){
    const {name,password} = req.body
    console.log(req.body)
    const user = await User.findOne({name,password})
   
    if(!user) return res.render('login',{error:"Invalid Username or Password"})

    // const sessionId = uuidv4(); //for stateless session
    const token = setUser(user) //stateful auth


    // const token = setUser(user) For HEader Authorization demo



    res.cookie('uid',token,{
        httpOnly: true,
        secure: true,        // required for HTTPS
        sameSite: 'Lax',     // or 'None' if cross-site (then also need HTTPS)
        maxAge: 24 * 60 * 60 * 1000, // optional: 1 day
      })

    // return res.json({token}) For Header Authorization demo
    return res.redirect('/')

}

async function handleLogout(req,res){
    res.clearCookie('uid');
    return res.redirect('/login');

}

module.exports = {handleUserSign,handleUserLogin,handleLogout};