const express = require('express')
const app = express();
const connectMongodb = require('./connection')
const PORT = 3001;
const {router} = require('./routes/url')
const URL = require('./models/url')


connectMongodb('mongodb://localhost:27017/short-url')


app.use(express.json())
app.use('/url', router )



app.listen(PORT, ()=>{
    console.log(`Server starte at ${PORT}`)
})