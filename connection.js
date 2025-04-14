const mongoose = require('mongoose');

async function connectMongodb(url){
    return mongoose.connect(url).then(()=>{console.log("Mongodb Connected")})
}

module.exports = connectMongodb;