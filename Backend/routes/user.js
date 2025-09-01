const express=require("express")
const router=express.Router()
const {body}=require("express-validator")
const {registerUser,loginUser}=require("../controllers/user")

router.post("/register",[
    body('email').isEmail().withMessage("Invalid Email"),
    body("fullname.firstName").isLength({min:3}).withMessage("First Name must be atleast characters Long"),
    body("password").isLength({min:6}).withMessage("Password Must be 6 Characters Long.")
],registerUser)

router.post("/login",[
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({min:6}).withMessage("Password Must be 6 Characters Long.")
],loginUser)

module.exports=router