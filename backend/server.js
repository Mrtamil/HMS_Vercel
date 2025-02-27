import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/admin.route.js";
import userRouter from "./routes/user.route.js";
import doctorRouter from "./routes/doctor.route.js";
import Blood_Bank_Route from './routes/BloodBankRoute.js'
import Pharmecy_route from './routes/PharmecyRoute.js'
import OutPatientRoute from "./routes/OutPatientOfflineRoute.js";
import InPatientRoute from "./routes/InPatientRoute.js";

const app = express();
const Port = process.env.PORT
connectDB()
connectCloudinary()
 

app.use(express.json());
app.use(cors());

app.use("/api/admin", adminRouter)
app.use("/api/user", userRouter)
app.use("/api/doctor", doctorRouter)
app.use("/api/bloodbank",Blood_Bank_Route)
app.use("/api/pharmecy",Pharmecy_route)
app.use("/api/outpatient", OutPatientRoute)
app.use("/api/inpatient", InPatientRoute)

app.get("/",(req,res) => {
    res.send('API Working')
})

app.listen(Port, () => console.log(`Server started on port: ${Port}`))
