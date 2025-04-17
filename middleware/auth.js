const { getUser } = require('../service/auth')


// For Header authorization demo------------------------------------------------------------
// function restrict(req,res,next){
//     const userHeader = req.headers['authorization']
//     req.user = null

//     if(!userHeader || !userHeader.startsWith('Bearer')){
//         return next();
//     }

//     const token = userHeader.split('Bearer ')[1];
//     const user = getUser(token)

//     req.user = user;
//     return next();

// }------------------------------------------------------------


 async function restrict(req, res, next) {
    const userUid = await req.cookies?.uid;
    req.user = null
    // const userUid = req.headers['authorization'].split('Bearer ')[1] For HEader authorization demo


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


 function roleRestrict(role=[]){
    return function (req,res,next){
        if(!req.user) return res.redirect('/')

        if(!role.includes(req.user.role)){
            return res.end("Unauthoized")
        }
        return next();
    }
}


// -----------------------------------------------------------
// Don't need now
// async function checkAuth(req,res,next){
//     const userUid = req.headers['authorization'].split('Bearer ')[1]
//     // const userUid = req.cookies?.uid;
//         const user = getUser(userUid)
//         req.user = user;
//         next();
// }
// -----------------------------------------------------------

module.exports = {
    restrict, roleRestrict
}