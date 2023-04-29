const jwt = require('jsonwebtoken')

module.exports = function(role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try{
            const token = req.headers.authorization.split(' ')[1]
            if (!token){
                return res.status(401).json({message:"The User is not logged in!"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.role !== role) {
                return res.json(403).json({message:"You have no access!"})
            }
            req.user = decoded
            next()
        } catch (e) {
            res.status(401).json({message:"The User is not logged in!"})
        }
    };
}
