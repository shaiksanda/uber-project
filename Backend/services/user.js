const userModel=require("../models/user")

module.exports.createUser=async({firstName,lastName,email,password})=>{
    if (!firstName || !email || !password){
        throw new Error("All Fields Required")
    }

    const user=await userModel.create({fullname:{firstName,lastName},email,password})

    return user
}