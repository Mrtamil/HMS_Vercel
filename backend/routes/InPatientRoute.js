import express from 'express'
const InPatientRoute = express.Router()

import { CreateIp, GetAllIp, GetSingleIp, UpdateIp, DeleteIp } from '../controllers/InPatientControl.js'

InPatientRoute.post('/pip/',CreateIp)
InPatientRoute.get('/gaip/',GetAllIp)
InPatientRoute.get('/gsip/:id', GetSingleIp)
InPatientRoute.put('/uip/:id',UpdateIp)
InPatientRoute.delete('/dip/:id',DeleteIp)

export default InPatientRoute;
