const authContoller = require("../controllers/auth-controller");
const { Router } = require("express");
const router = Router();

router.get("/login", authContoller.login_get);
router.get("/signup", authContoller.signup_get);
router.post("/login", authContoller.login_post);
router.post("/signup", authContoller.signup_post);
router.get("/logout", authContoller.logout);

module.exports = router;