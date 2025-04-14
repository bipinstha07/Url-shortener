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
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, //stores the user _id
        ref:'users' // reference to User
    }
},

    {
        timestamps:true
    }
)

const URL = mongoose.model('url', urlSchema)

module.exports = URL;