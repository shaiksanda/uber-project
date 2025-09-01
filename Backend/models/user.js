const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const userSchema=new mongoose.Schema({
    fullname:{
        firstName:{
            type:String,
            required:true,
            minLength:[3,"First Name must be atleast characters Long"]
        },
        lastName:{
            type:String,
            minLength:[3,"Last Name must be atleast characters Long"]
        },  
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minLength:[5,"Email must be atleast characters Long"]
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String,
    }
})

// 🔐 Hash password
userSchema.statics.hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};
// Compare password
userSchema.statics.comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

// Generate JWT
userSchema.statics.generateAuthToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;