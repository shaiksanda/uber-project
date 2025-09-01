const dotenv=require("dotenv")
dotenv.config()

const express=require("express")
const cors=require("cors")
const app=express()
const connectToMongoDB=require("./db/db")
connectToMongoDB()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const userRoutes=require("./routes/user")
app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.use("/users",userRoutes)

module.exports=app