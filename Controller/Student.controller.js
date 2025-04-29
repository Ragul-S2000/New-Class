import Student from "../Models/Student.schema.js";

import Mentor from "../Models/Mentor.schema.js";

export const createStudent = async (req, res) => {
    try {
        const create = await Student.create(req.body)
        if (!create) {
            return res.status(400).json({ message: "Student  not created" })
        }
        create.save()
        res.status(201).json({ message: "Student Created Successfully", data: create })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


export const AddMentor = async (req, res) => {
    try {
        const { mentorId, studentId } = req.body;
        const findStudent = await Student.findById(studentId)
        if (!findStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        const findMentor = await Mentor.findById(mentorId)
        if (!findMentor) {
            return res.status(404).json({ message: "Mentor not found" });
        }
        if (findStudent.Mentors == mentorId) {
            return res.status(400).json({ message: "Mentor already added" })
        }
        const pushMentor = await Student.findByIdAndUpdate(studentId, { $set: { Mentors: mentorId } }, { new: true })
        res.status(200).json({ message: "Mentor added successfully", data: pushMentor });

        const updatePrevMentor = await Student.findByIdAndUpdate(studentId, { $push: { prevMentor:findStudent.Mentors } }, { new: true })

        const updateMentor = await Mentor.updateMany({ _id: { $in: mentorId } }, { $set: { students: studentId } }, { new: true })
        res.status(200).json({ message: "Student added successfully", data: updateMentor })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}




export const MentorOfStudents = async (req, res) => {
    try {
        const getStudents = await Student.find({ Mentors: { $ne: null } }).populate("Mentors")
        if (!getStudents) {
            return res.status(404).json({ message: "No students found" })
        }
        res.status(200).json({
            message: "Students found", data: {
                students: getStudents.map((student) => {
                    return {
                        _id: student._id,
                        name: student.name,
                        email: student.email,
                        Mentors: student.Mentors.map((mentor) => {
                            return {
                                _id: mentor._id,
                                name: mentor.name
                            }
                        })
                    }
                })
            }
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


export const getPreviousMentor = async (req, res) => {
    try {
        const { studentId } = req.body
        const findStudent = await Student.findById(studentId).populate("prevMentor")
        if (!findStudent) {
            return res.status(404).json({ message: "Student not found" })
        }
        res.status(200).json({ message: "Previous mentor found", data: findStudent.prevMentor })
        
    } catch (error) {
       res.status(500).json({error : error.message}) 
    }
}

