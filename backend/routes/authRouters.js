const express = require("express");
const router = express.Router();
const { signupUser, signinUser, updatePassword } = require("../controllers/authController");
const { signupValidation, handleValidation } = require("../middlewares/validators");
const auth = require("../middlewares/auth");

// SIGNUP (with validation)
router.post("/signup", signupValidation, handleValidation, signupUser);

// LOGIN (THIS is the correct name your frontend expects)
router.post("/login", signinUser);

// UPDATE PASSWORD
router.patch("/update-password", auth, updatePassword);

module.exports = router;
