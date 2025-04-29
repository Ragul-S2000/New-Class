import mongoose from "mongoose";




const studentSchema = new mongoose.Schema({
    name :String ,
    email :String ,
    password :String,
    department :String,
    Mentors:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Mentor"
    },
    prevMentor:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Mentor"
    }],
})

const Student = mongoose.model("Student", studentSchema)
export default Student