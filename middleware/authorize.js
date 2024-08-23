const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authorize = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
            if(err) {
                console.log(err);
                res.redirect("/");
            } else {
                console.log(decodedToken);
                next();
            }
        } )
    } else {
        res.redirect("/");
    }
}

module.exports = authorize;