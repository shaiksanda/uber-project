const userModel = require("../models/user")

const { createUser } = require("../services/user")

const { validationResult } = require("express-validator")


const BlacklistToken=require("../models/blacklistToken")


module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { fullname, email, password } = req.body

    const hashedPassword = await userModel.hashPassword(password)

    const user = await createUser({ firstName: fullname.firstName, lastName: fullname.lastName, email, password: hashedPassword })

    const token = userModel.generateAuthToken(user._id)
    res.status(201).json({ token, user })

}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    const existingUser = await userModel.findOne({ email }).select("+password")

    if (!existingUser) {
        return res.status(401).json({ message: "Invalid Email Or Wrong Password" })
    }

    const isPasswordMatched = await userModel.comparePassword(password, existingUser.password)

    if (!isPasswordMatched) {
        return res.status(401).json({ message: "Invalid Email Or Wrong Password" })
    }

    const token = await userModel.generateAuthToken(existingUser._id)
    return res.status(200).json({ token, existingUser })
}

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user)
}

module.exports.logoutUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    await BlacklistToken.create({token})

    res.status(200).json({message:"Logged Out Successful!"})
}