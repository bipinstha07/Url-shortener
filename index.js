const express = require('express')
const app = express();
const connectMongodb = require('./connection')
const PORT = 3001;
const { router } = require('./routes/url')
const URL = require('./models/url')
const path = require('path')
const routera = require('./routes/user')
const cookieParser = require('cookie-parser');
//Install cookie parser to use this

const { restrict, checkAuth } = require('./middleware/auth')
// connectMongodb('mongodb://localhost:27017/short-url')
connectMongodb('mongodb+srv://bipinshrestha830:KcnGC3WJgsYkwxEv@cluster0.dkesjvs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))
//for view 


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
//cookie parser

app.use('/url', restrict, router)

// Get all USer
app.get('/test', async (req, res) => {
    const allUrl = await URL.find({})
    return res.render('home', {
        url: allUrl,
    })
})

app.get('/', checkAuth, async (req, res) => {
    if (!req.user) return res.redirect('/login')
    const allUrl = await URL.find({ createdBy: req.user._id })
    const user = req.user.name
    return res.render('test1', {
        url: allUrl,
        name: user

    })
})

app.use('/', routera)

app.listen(PORT, () => {
    console.log(`Server starte at ${PORT}`)
})  