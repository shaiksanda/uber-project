const captainModel=require("../models/captain")
const BlacklistToken=require("../models/blacklistToken")

const {createCaptain}=require("../services/captain")
const { validationResult } = require("express-validator")

module.exports.registerCaptain=async(req,res,next)=>{
    const errors=validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { fullname, email, password,vehicle } = req.body

    const isCaptailAlreadyExists=await captainModel.findOne({email})
    if (isCaptailAlreadyExists){
        return res.status(400).json({message:"Captain Already Exists"})
    }

    const hashedPassword = await captainModel.hashPassword(password)

    const captain = await createCaptain({ firstName: fullname.firstName, lastName: fullname.lastName, email, password: hashedPassword,color:vehicle.color,plate:vehicle.plate,capacity:vehicle.capacity,vehicleType:vehicle.vehicleType })

    const token = captainModel.generateAuthToken(captain._id)
    res.status(201).json({ token, captain })

}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    const existingCaptain = await captainModel.findOne({ email }).select("+password")

    if (!existingCaptain) {
        return res.status(401).json({ message: "Invalid Email Or Wrong Password" })
    }

    const isPasswordMatched = await captainModel.comparePassword(password, existingCaptain.password)

    if (!isPasswordMatched) {
        return res.status(401).json({ message: "Invalid Email Or Wrong Password" })
    }

    const token = await captainModel.generateAuthToken(existingCaptain._id)
    return res.status(200).json({ token, existingCaptain })
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json(req.captain)
}

module.exports.logoutCaptain = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    await BlacklistToken.create({token})

    res.status(200).json({message:"Logged Out Successful!"})
}
