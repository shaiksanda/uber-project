const userModel=require("../models/user")

const {createUser}=require("../services/user")

const {validationResult}=require("express-validator")


module.exports.registerUser=async(req,res,next)=>{
    const errors=validationResult(req)

    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {fullname,email,password}=req.body

    const hashedPassword =await userModel.hashPassword(password)

    const user=await createUser({firstName:fullname.firstName,lastName:fullname.lastName,email,password:hashedPassword})

    const token=userModel.generateAuthToken()
    res.status(201).json({token,user})

}