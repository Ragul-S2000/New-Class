import express from 'express';
import { createStudent ,AddMentor, MentorOfStudents, getPreviousMentor} from '../Controller/Student.controller.js';



const router = express.Router();

router.post ("/create",createStudent)

router.post ("/addMentor",AddMentor)

router.get ("/showMentor",MentorOfStudents)

router.get ("/showPrevMentor/:id",  getPreviousMentor) ,getPreviousMentor


export default router;