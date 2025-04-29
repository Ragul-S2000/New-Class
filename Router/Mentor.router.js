import express from 'express';
import { AddStudents, createMentor, emptyMentors } from '../Controller/Mentor.controller.js';



const router = express.Router();

router.post ("/create",createMentor)

router.post ("/multipleAssign",AddStudents)

router.get  ("/emptyMentors",emptyMentors)


export default router;