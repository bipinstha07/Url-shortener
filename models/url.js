const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    shortID:{
        type:String,
        unique:true,
        required:true
    },
    reDirectUrl:{
        type:String,
        required:true,
    }
    ,

    visitHistory: [{
        timestamp: { type:String}
    }],
},

    {
        timestamps:true
    }
)

const URL = mongoose.model('url', urlSchema)

module.exports = URL;