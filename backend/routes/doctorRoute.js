import express from 'express';
import { loginDoctor, appointmentsDoctor, appointmentCancel, doctorList, appointmentComplete, doctorDashboard, doctorProfile, updateDoctorProfile, changeAvailability } from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';
import { requireEmailPassword, requireObjectIds } from '../middlewares/validateRequest.js';

const doctorRouter = express.Router();

doctorRouter.post('/login', requireEmailPassword, loginDoctor)
doctorRouter.post('/cancel-appointment', authDoctor, requireObjectIds(['appointmentId']), appointmentCancel)
doctorRouter.get('/appointments', authDoctor, appointmentsDoctor)
doctorRouter.get('/list', doctorList)
doctorRouter.post('/change-availability', authDoctor, requireObjectIds(['docId']), changeAvailability)
doctorRouter.post('/complete-appointment', authDoctor, requireObjectIds(['appointmentId']), appointmentComplete)
doctorRouter.get('/dashboard', authDoctor, doctorDashboard)
doctorRouter.get('/profile', authDoctor, doctorProfile)
doctorRouter.post('/update-profile', authDoctor, updateDoctorProfile)

export default doctorRouter;
