const dotenv=require("dotenv")
dotenv.config()

const express=require("express")
const cors=require("cors")
const app=express()
const cookieParser=require("cookie-parser")
const connectToMongoDB=require("./db/db")
connectToMongoDB()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const userRoutes=require("./routes/user")
const captainRoutes=require("./routes/captain")

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.use("/users",userRoutes)
app.use("/captain/",captainRoutes)
module.exports=app


//1:30:54