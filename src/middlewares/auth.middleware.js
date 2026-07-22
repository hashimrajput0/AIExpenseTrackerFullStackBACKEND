import jwt from "jsonwebtoken"

async function authMiddleware(req, res, next) {

    try {
        const token = req.cookies.token

        if(!token) {
            return res.status(400).json({
                message : "Access Denied"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userID = decoded.id
        
        
        next()  





    }
    catch(err) {
        res.status(401).json({
            message : "Invalid Token"
        })
    }

}

export default authMiddleware