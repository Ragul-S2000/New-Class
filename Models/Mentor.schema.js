import mongoose from "mongoose";




const MentorSchema = new mongoose.Schema(
    {
    name:String ,
    email :String ,
    password :String,
    department :String,
    role:String,
    students :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Student"
    }]
}
)


const Mentor = mongoose.model("Mentor", MentorSchema)
export default Mentor