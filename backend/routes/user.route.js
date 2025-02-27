import express from "express"
import { RegisterUser, loginUser, getProfile, updateProfile, listAppointment, cancelAppointment, bookAppointment,  paymentRazorpay, verifyRazorpay, } from "../controllers/user.controller.js"
import authUser from '../middleware/authUser.js';
import upload from '../middleware/multer.js';
const userRouter = express.Router();


userRouter.post("/register", RegisterUser)
userRouter.post("/login", loginUser)
userRouter.get("/get-profile", authUser, getProfile)
userRouter.post("/update-profile", upload.single('image'),authUser, updateProfile)
userRouter.post("/book-appointment", authUser, bookAppointment)
userRouter.get("/appointments", authUser, listAppointment)
userRouter.post("/cancel-appointment", authUser, cancelAppointment)
userRouter.post("/payment-razorpay", authUser, paymentRazorpay)
userRouter.post("/verifyRazorpay", authUser, verifyRazorpay)




export default userRouter;