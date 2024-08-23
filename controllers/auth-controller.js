const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const queries = require("../queries");
const client = require("../db-connect");

const tokenAge = 24 * 60 * 60;
dotenv.config();
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: tokenAge
    });
};

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

const users = [];

module.exports.signup_get = (req, res) => {
    res.send("Signup page");
};
module.exports.signup_post = async (req, res) => {
    try {
        const user = req.body;

        //check if user already exists --> by email
        client.query(queries.getRecordByEmail, [user.email], async (err, result) => {
            if(err) {
                console.log(err);
                return res.status(400).send(err);
            }
            if(result.rows.length) {
                return res.status(201).send("This email already exists");
            }

            //if not, create jwt token and hash the entered password
            const token = createToken(user.id);
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: tokenAge * 1000
            });
            user.password = await hashPassword(user.password);

            //save the user to db
            client.query(queries.addUser, [user.email, user.username, user.password], (err, result) => {
                if(err) {
                    console.log(err);
                    return res.status(400).send(err);
                }
                return res.status(201).send("User registered successfully");
            });
    
        });

    } catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
    
};
module.exports.login_get = (req, res) => {
    res.send("Login page");
};
module.exports.login_post = (req, res) => {
    try {
        const user = req.body;

        //check if user exists already --> by email
        client.query(queries.getRecordByEmail, [user.email], async (err, result) => {
            if(err) {
                console.log(err);
                return res.status(400).send(err);
            }
            if(!result.rows.length) {
                return res.status(201).send("No such email exists");
            }

            //if exists, validate username and password
            const { username, password } = result.rows[0];
            if(username === user.username) {
                const isPasswordValid = bcrypt.compare(user.password, password);
                if(isPasswordValid) {
                    const token = createToken(user.id);
                    res.cookie("jwt", token, {
                        httpOnly: true,
                        maxAge: tokenAge * 1000
                    });
                    return res.send("Logging you in");
                }
                return res.redirect("/");
                
            } 
            return res.send("Invalid username");
        });

    } catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
};

module.exports.logout = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
};