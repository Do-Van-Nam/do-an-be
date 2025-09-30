const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const authMiddleware = (req, res, next) => {
    // const authHeader = req.header('Authorization')

    // if (!authHeader) return res.status(401).json({ message: 'No token, authorization denied' })
    // const token = authHeader.split(' ')[1]

    const token = req.cookies?.token
    if (!token) return res.status(401).json({ message: 'Token invalid, authorization denied' })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({ message: 'No token, authorization denied' })
    }
}

module.exports = {authMiddleware}