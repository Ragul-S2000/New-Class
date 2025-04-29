
import Mentor from '../Models/Mentor.schema.js';
import Student from '../Models/Student.schema.js';  


export const createMentor = async (req, res) => {
try {
    const create = await Mentor.create(req.body)
    if(!create){
        return res.status(400).json({message : "Mentor not created"})
    }
     create.save()
    res.status(201).json({message : "Mentor Created Successfully", data : create})
    
} catch (error) {
   res.status(500).json({error : error.message})     
}
}


export const AddStudents = async (req,res) =>{
    try {
        const { mentorId, studentId } = req.body;
    const findMentor = await Mentor.findById(mentorId)
    if (!findMentor) {
            return res.status(404).json({ message: "Mentor not found" });
    }else{

        const pushStudent = await Mentor.findByIdAndUpdate(mentorId,{$push:{students : {$each : studentId}}},{new : true})
        res.status(200).json({ message: "Student added successfully", data: pushStudent });
    } 
    const  updateStudent = await Student.updateMany({_id : {$in : studentId}}, {$set : {Mentors : mentorId}}, {new : true})
    if(!updateStudent){
        return res.status(400).json({message : "Student not updated"})
    }
    res.status(200).json({message : "Student updated successfully", data : updateStudent})   
}
    catch(error) {
        res.status(500).json({error : error.message})
    }
}



export const emptyMentors = async (req,res) =>{
    try {
        const findEmpty = await Student.find()
        const nullMentor = findEmpty.filter((student) => student.Mentors == null)
        if(!findEmpty){
            return res.status(400).json({message : "No empty mentors"})
        }
        res.status(200).json({message : "Mentors are not assigned for these peoples", data : nullMentor})
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}