const  {nanoid} = require('nanoid')
const URL = require('../models/url')
const moment = require('moment')

async function handlegenerateUrl(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "URL is required"})
    
    const short = nanoid(5);
    await URL.create(
        {
            shortID: short,
             reDirectUrl: body.url, 
            visitHistory: []
        }
    )
    return res.json({id: short})
}

async function handlegetRedirect(req,res){
    const shortID = req.params.shortId;
   const entry =  await URL.findOneAndUpdate({
        shortID
    },{
        $push: {
            visitHistory : {
               timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
            }
        }
    })
    
    if (!entry) {
        return res.status(404).send("URL not found");
    }
    
    res.redirect(entry.reDirectUrl)
}


async function handleanalytics(req,res){
    const shortID = req.params.shortId;
    // Use findone for accuurate one data and won't have to use indexing
    // if we use find then we will have to use indexing to get data
    const result = await URL.findOne({
        shortID
    })

    return res.json({TotalClicks: result.visitHistory.length, Analytics: result.visitHistory})
}


module.exports = {handlegenerateUrl,handlegetRedirect,handleanalytics};