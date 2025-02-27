import Blood_Bank from '../models/BloodBankModel.js';
import mongoose from 'mongoose';

const generateCustomId = async () => {
    const lastUser = await Blood_Bank.findOne().sort({ _id: -1 }).lean();
    
    let nextIdNumber = 1;

    if (lastUser) {
        const lastId = lastUser._id;
        const lastNum = parseInt(lastId.substring(1), 10); // Extract numeric part
        nextIdNumber = lastNum + 1;
    }

    return `B${nextIdNumber.toString().padStart(3, "0")}`; // Ensures format: B001, B002, etc.
};

// ✅ Fix: Ensure `_id` is unique before inserting
export const CreateTable = async (req, res) => {
    try {
        let pId;
        let exists;
        do {
            pId = await generateCustomId();
            exists = await Blood_Bank.findOne({ _id: pId }); // Fix `_id` lookup
        } while (exists);

        const {
            Blood_Group,
            Volume,
            Storage_Temp,
            Location,
            Collection_Date,
            Expiry_Period, // Fixed Typo
            Status
        } = req.body;


        const newdata = await Blood_Bank.create({
            _id: pId,
            Blood_Group,
            Volume,
            Storage_Temp,
            Location,
            Collection_Date,
            Expiry_Period, // Fixed Typo
            Status
        });

        res.status(201).json(newdata);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

export const GetAllData = async (req, res) => {
    try {
        const Table = await Blood_Bank.find({});
        res.status(200).json(Table);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

export const GetSingleData = async (req, res) => {
    const { id } = req.params;
  
    try {
        const Table = await Blood_Bank.findById(id);
        if (!Table) return res.status(404).json({ error: 'Data not found' });
        res.status(200).json(Table);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

export const UpdateData = async (req, res) => { // Fixed function name
    const { id } = req.params;
   
    try {
        const Table = await Blood_Bank.findByIdAndUpdate(id, req.body, { new: true });
        if (!Table) return res.status(404).json({ error: 'Data not found' });
        res.status(200).json(Table);
    } catch (e) {
        res.status(400).json({ error: e.message }); // Fixed JSON syntax error
    }
};

export const DeleteData = async (req, res) => {
    const { id } = req.params;
  
    try {
        const Table = await Blood_Bank.findByIdAndDelete(id);
        if (!Table) return res.status(404).json({ error: 'Data not found' });
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};
