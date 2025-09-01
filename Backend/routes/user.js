const express=require("express")
const router=express.Router()
const {body}=require("express-validator")
const {registerUser}=require("../controllers/user")

router.post("/register",[
    body('email').isEmail().withMessage("Invalid Email"),
    body("fullname.firstName").isLength({min:3}).withMessage("First Name must be atleast characters Long"),
    body("password").isLength({min:6}).withMessage("Password Must be 6 Characters Long")
],registerUser)

module.exports=router