import express from 'express';
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';
import { requireEmailPassword, requireFields, requireObjectIds, requireStrongPassword } from '../middlewares/validateRequest.js';

const userRouter = express.Router();

userRouter.post('/register', requireFields(['name', 'email', 'password']), requireEmailPassword, requireStrongPassword, registerUser)
userRouter.post('/login', requireEmailPassword, loginUser)
userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/update-profile', upload.single('image'), authUser, requireFields(['name', 'phone', 'dob', 'gender']), updateProfile)
userRouter.post('/book-appointment', authUser, requireObjectIds(['docId']), requireFields(['slotDate', 'slotTime']), bookAppointment)
userRouter.get('/appointments', authUser, listAppointment)
userRouter.post('/cancel-appointment', authUser, requireObjectIds(['appointmentId']), cancelAppointment)
userRouter.post('/payment-razorpay', authUser, requireObjectIds(['appointmentId']), paymentRazorpay)
userRouter.post('/verifyRazorpay', authUser, requireFields(['razorpay_order_id', 'razorpay_payment_id', 'razorpay_signature']), verifyRazorpay)

export default userRouter;

