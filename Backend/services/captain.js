const captainModel=require("../models/captain")

module.exports.createCaptain=async({firstName,lastName,email,password,color,plate,capacity,vehicleType})=>{
    if (!firstName || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error("All Fields Are Required")
    }

    const captain=await captainModel.create({fullname:{firstName,lastName},email,password,vehicle:{color,plate,capacity,vehicleType}})
    return captain
}