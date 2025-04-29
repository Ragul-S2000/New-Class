import express from "express"
import cors from "cors"
import dotenv from  "dotenv"
import connectDB from "./database/configData.js"
dotenv.config()

import mentorRouter from "./Router/Mentor.router.js"
import studentRouter from "./Router/Student.router.js"

const App = express()

App.use(express.json())

App.use(cors())

App.get("/", (req, res) => {
    res.send("Hello World")
})

App.use("/api/mentor", mentorRouter)

App.use("/api/student", studentRouter)

connectDB()

App.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})



