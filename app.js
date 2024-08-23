const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user-routes");
const authRouter = require("./routes/auth-routes");
const authorize = require("./middleware/authorize");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/user", authorize, userRouter);
app.use(authRouter);

app.get("/", authorize, (req, res) => {
    //check if user is logged in
    res.send("Home page");
    //if logged in --> user home page
    //else --> intro page for signing up or logging in
});




app.listen(3000, () => {
    console.log("Server listening on port 3000");
}); 