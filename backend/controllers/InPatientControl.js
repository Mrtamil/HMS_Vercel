import Inpatient from "../models/InPatientModel.js";

  const generateCustomId = async () => {
    const lastUser = await Inpatient.findOne().sort({ _id: -1 }).lean(); 
    
    let nextIdNumber = 1; 

    if (lastUser) {
        const lastId = lastUser._id; 
        const lastNum = parseInt(lastId.substring(1), 10); 
        nextIdNumber = lastNum + 1;
    }

    return `IP${nextIdNumber.toString().padStart(3, "0")}`; 
};


export const CreateIp = async (req, res) => {
    try {
        let pId;
        let exists;
        do {
            pId = await generateCustomId(); 
            exists = await Inpatient.findById(pId); 
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
          Doctor,
          Emergency_Contect,
          BloodGroup,
          Married_Status,
          Payment
        } = req.body;

        
        const newoutpatient = await Inpatient.create({
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
          Doctor,
          Emergency_Contect,
          BloodGroup,
          Married_Status,
          Payment
        });

        res.status(201).json(newoutpatient);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};


export const GetAllIp = async (req, res) => {
    try {
        const patient = await Inpatient.find({});
        res.status(200).json(patient);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};


export const GetSingleIp = async (req, res) => {
    const { id } = req.params;

  
    try {
        const patient = await Inpatient.findById(id);
        if (!patient) return res.status(404).json({ message: 'Data not found!' });

        res.status(200).json(patient);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};


export const UpdateIp = async (req, res) => {
    const { id } = req.params;


    try {
        const updatedPatient = await Inpatient.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedPatient) return res.status(404).json({ message: 'Data not found' });

        res.status(200).json(updatedPatient);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};


export const DeleteIp = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPatient = await Inpatient.findByIdAndDelete(id);

        if (!deletedPatient) return res.status(404).json({ message: 'Data not found' });

        res.status(200).json(deletedPatient);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};


export default {
    CreateIp,
    GetAllIp,
    GetSingleIp,
    UpdateIp, 
    DeleteIp
};