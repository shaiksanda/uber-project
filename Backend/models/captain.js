const mongoose = require("mongoose")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const captainSchema = new mongoose.Schema({
    fullname: {
        firstName: {
            type: String,
            required: true,
            minLength: [3, "First Name must be alteast  3 characters long"]
        },
        lastName: {
            type: String,
            minLength: [3, "Last Name must be alteast  3 characters long"]
        },

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,   // converts automatically to lowercase
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Please Enter A Valid Email"]
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"inactive"
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minLength:[3,"Color must be Atleast 3 characters Long."]
        },
        plate:{
            type:String,
            required:true,
            minLength:[3,"Plate must be Atleast 3 characters Long."]
        },
        capacity:{
            type:Number,
            required:true,
            minLength:[1,"Capacity must be Atleast 1"]
        },
        vehicleType:{
            type:String,
            required:true,
            enum:["car",'motorcycle','auto'],
        }
    },
    location:{
        lat:{
            type:Number
        },
        lng:{
            type:Number
        }
    }
})

captainSchema.statics.generateAuthToken = (captainId) => {
    return jwt.sign({ id: captainId }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

captainSchema.statics.hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

captainSchema.statics.comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const captainModel = mongoose.model("Captain", captainSchema);
module.exports = captainModel;