const { getUser } = require('../service/auth')

async function restrict(req, res, next) {
    const userUid = req.cookies?.uid;
//get the cookies if we have 
//if we haven't done login then there is no cookie and nothing is store in useruid 
    if (!userUid) return res.redirect('/login')

    const user = getUser(userUid)
    //even if we have uuid then get the user model and if they don't match there is no user
    if (!user) return res.redirect('/login')
    req.user = user;
    //sends user to url created and accessed as req.user.id
    next();

}
async function checkAuth(req,res,next){
    const userUid = req.cookies?.uid;
        const user = getUser(userUid)
        req.user = user;
        next();
}

module.exports = {
    restrict,checkAuth
}