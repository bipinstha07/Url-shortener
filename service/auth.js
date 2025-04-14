// const sessionIdMap = new Map() stateful auth

const jwt = require('jsonwebtoken')
const secret = 'bipin@22$'
function setUser(user){
    return jwt.sign({
        _id:user._id,
        name:user.name,
        email:user.email
    },secret)
    // sessionIdMap.set(id,user) stateful auth
}

function getUser(token){
    if(!token) return null;
    return jwt.verify(token,secret)
    // return sessionIdMap.get(id) stateful auth
} 

module.exports = {
    setUser,getUser
} 