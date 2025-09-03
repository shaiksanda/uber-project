const express = require("express")
const router = express.Router()
const { body } = require("express-validator")
const {registerCaptain,loginCaptain,getCaptainProfile, logoutCaptain}=require("../controllers/captain")
const { authenticateCaptain } = require("../middlewares/auth")


router.post("/register", [
    body('email').isEmail().withMessage("Invalid Email"),
    body("fullname.firstName").isLength({ min: 3 }).withMessage("First Name must be atleast characters Long"),
    body("password").isLength({ min: 6 }).withMessage("Password Must be 6 Characters Long."),
    body("vehicle.color").isLength({ min: 3 }).withMessage("Color Must be 6 Characters Long."),
    body("vehicle.plate").isLength({ min: 3 }).withMessage("Plate Must be 6 Characters Long."),
    body("vehicle.capacity").isLength({ min: 1}).withMessage("Capacity Must be 1."),
    body("vehicle.vehicleType").isIn(["car","auto","motorcycle"]).withMessage("Invalid Vehicle Type.")
],registerCaptain)

router.post("/login",[
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({min:6}).withMessage("Password Must be 6 Characters Long.")
],loginCaptain)

router.get("/profile",authenticateCaptain,getCaptainProfile)



router.get("/logout",authenticateCaptain,logoutCaptain)

module.exports = router