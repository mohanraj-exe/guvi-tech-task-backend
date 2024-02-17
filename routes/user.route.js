const express = require("express");
const router = express.Router();

const { SignUp, Login, UserProfile } = require("../controller/user.controller");
const  { Auth } = require("../middleware/auth");

router.post('/signup', SignUp);
router.post('/login', Login);
router.patch('/profile', Auth, UserProfile);

module.exports = router;