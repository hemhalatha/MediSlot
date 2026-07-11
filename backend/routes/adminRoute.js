import express from 'express'
import { addDoctor, adminDashboard, allDoctors, appointmentCancel, appointmentsAdmin, loginAdmin } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/doctorController.js'
import { requireEmailPassword, requireFields, requireObjectIds, requireStrongPassword } from '../middlewares/validateRequest.js'

const adminRouter = express.Router()

adminRouter.post('/login', requireEmailPassword, loginAdmin)
adminRouter.post('/add-doctor', authAdmin, upload.single('image'), requireFields(['name', 'email', 'password', 'speciality', 'degree', 'experience', 'about', 'fees', 'address']), requireEmailPassword, requireStrongPassword, addDoctor)
adminRouter.get('/all-doctors', authAdmin, allDoctors)
adminRouter.post('/change-availability', authAdmin, requireObjectIds(['docId']), changeAvailability)
adminRouter.get('/appointments', authAdmin, appointmentsAdmin)
adminRouter.post('/cancel-appointment', authAdmin, requireObjectIds(['appointmentId']), appointmentCancel)
adminRouter.get('/dashboard', authAdmin, adminDashboard)

export default adminRouter
