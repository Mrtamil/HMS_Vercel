import express from 'express'
const Blood_Bank_Route = express.Router()

import { CreateTable, GetAllData, GetSingleData, UpdateData, DeleteData} from '../controllers/Blood_Bank_Control.js'

Blood_Bank_Route.post("/pb/",CreateTable);
Blood_Bank_Route.get("/gab/", GetAllData);
Blood_Bank_Route.get("/gsb/:id",GetSingleData);
Blood_Bank_Route.put("/ub/:id",UpdateData);
Blood_Bank_Route.delete("/db/:id",DeleteData);

export default Blood_Bank_Route;