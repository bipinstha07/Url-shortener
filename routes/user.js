const express = require('express');
const {handleUserSign, handleUserLogin,handleLogout} = require('../controllers/user')

const routera = express.Router();

routera.get('/signup', (req,res)=>{
    return res.render('form')
})

routera.get('/login', (req,res)=>{
    return res.render('login')
})
routera.post('/signup',handleUserSign)
routera.post('/login',handleUserLogin)
routera.get('/logout',handleLogout)

module.exports = routera;