import Outpatient from '../models/OutPatientModel.js'
import mongoose from 'mongoose'

  const generateCustomId = async () => {
    const lastUser = await Outpatient.findOne().sort({ _id: -1 }).lean(); 
    
    let nextIdNumber = 1; 

    if (lastUser) {
        const lastId = lastUser._id; 
        const lastNum = parseInt(lastId.substring(1), 10); 
        nextIdNumber = lastNum + 1;
    }

    return `OP${nextIdNumber.toString().padStart(3, "0")}`; 
};


export const CreateOp = async (req, res) => {
    try {
        let pId;
        let exists;
        do {
            pId = await generateCustomId(); 
            exists = await Outpatient.findById(pId); 
        } while (exists); 

        const {
          _id,
          Patient_Name,
          Age_Sex,
          Unit,
          Admit_Date,
          Valid_Upto,
          CMCHIS,
          MLRS,
          MLC,
          OP_Room_No,
          Reason,
          Department,
          Payment
        } = req.body;

        
        const newoutpatient = await Outpatient.create({
            _id: pId,
            Patient_Name,
                Age_Sex,
                Unit,
                Admit_Date,
                Valid_Upto,
                CMCHIS,
                MLRS,
                MLC,
                OP_Room_No,
                Reason,
                Department,
                Payment
        });

        res.status(201).json(newoutpatient);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};


export const GetAllOp = async (req, res) => {
    try {
        const patient = await Outpatient.find({});
        res.status(200).json(patient);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};


export const GetSingleOp = async (req, res) => {
    const { id } = req.params;

  
    try {
        const patient = await Outpatient.findById(id);
        if (!patient) return res.status(404).json({ message: 'Data not found!' });

        res.status(200).json(patient);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};


export const UpdateOp = async (req, res) => {
    const { id } = req.params;


    try {
        const updatedPatient = await Outpatient.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedPatient) return res.status(404).json({ message: 'Data not found' });

        res.status(200).json(updatedPatient);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};


export const DeleteOp = async (req, res) => {
    const { id } = req.params;

   

    try {
        const deletedPatient = await Outpatient.findByIdAndDelete(id);

        if (!deletedPatient) return res.status(404).json({ message: 'Data not found' });

        res.status(200).json(deletedPatient);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};


export default {
    CreateOp,
    GetAllOp,
    GetSingleOp,
    UpdateOp, 
    DeleteOp
};