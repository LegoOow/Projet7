const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        console.log(req.headers)
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        console.log(decodedToken)
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
         });
    }
};