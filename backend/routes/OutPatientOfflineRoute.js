import express from 'express'
const OutPatientRoute = express.Router()

import { CreateOp, GetAllOp, GetSingleOp, UpdateOp,  DeleteOp } from "../controllers/OutPatientControl.js"

OutPatientRoute.post('/pop/',CreateOp)
OutPatientRoute.get('/gaop/',GetAllOp)
OutPatientRoute.get('/gsop/:id', GetSingleOp)
OutPatientRoute.put('/uop/:id',UpdateOp)
OutPatientRoute.delete('/dop/:id',DeleteOp)

export default OutPatientRoute;