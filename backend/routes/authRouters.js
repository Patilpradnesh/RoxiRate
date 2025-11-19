const express= require("express");
const router = express.Router();
const { signupUser, signinUser, updatePassword } = require("../controllers/authController");
const { signupValidation, handleValidation } = require("../middlewares/validators");



const auth=require('../middlewares/auth.js');

router.post("/signup",signupUser);
router.post("/signIn",signinUser);
router.patch("/update-password", auth, updatePassword);
router.post("/signup", signupValidation, handleValidation, signupUser);



module.exports= router;