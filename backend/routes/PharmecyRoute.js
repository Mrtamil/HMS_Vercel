import express from 'express'
const Pharmecy_route = express.Router()

import { CreateTable, GetAll, GetSingleData, UpdateData, DeleteData } from '../controllers/PharmercyController.js';

Pharmecy_route.post("/pp/", CreateTable);
Pharmecy_route.get("/gap/",GetAll);
Pharmecy_route.get("/gsp/:id",GetSingleData)
Pharmecy_route.put("/up/:id",UpdateData)
Pharmecy_route.delete("/dp/:id",DeleteData)

export default Pharmecy_route;