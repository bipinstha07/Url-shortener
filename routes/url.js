const express = require('express')
const router = express.Router();
const {handlegenerateUrl,handlegetRedirect,handleanalytics,handledelete} = require('../controllers/url')


router.post('/', handlegenerateUrl)
router.get('/:shortId',handlegetRedirect)
router.get('/analytics/:shortId',handleanalytics)



module.exports = {
    router
}   