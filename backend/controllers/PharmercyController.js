import Pharmacy from '../models/PharmacyModel.js';
import mongoose from "mongoose";

// ✅ Fix: Improved generateCustomId() functio
const generateCustomId = async () => {
    const lastUser = await Pharmacy.findOne().sort({ _id: -1 }).lean(); // .lean() for performance
    
    let nextIdNumber = 1; // Default ID if no previous records exist

    if (lastUser) {
        const lastId = lastUser._id; // Example: "P001"
        const lastNum = parseInt(lastId.substring(1), 10); // Extract numeric part
        nextIdNumber = lastNum + 1; // Increment the ID number
    }

    return `P${nextIdNumber.toString().padStart(3, "0")}`; // Ensures format: P001, P002, etc.
};

// ✅ Fix: Ensure `_id` is unique before inserting
export const CreateTable = async (req, res) => {
    try {
        let pId;
        let exists;
        do {
            pId = await generateCustomId(); // Generate ID
            exists = await Pharmacy.findById(pId); // Check if it already exists
        } while (exists); // If duplicate, generate a new one

        const {
            drug_name, category, usage, form, dosage, manufacturer,
            buying_date, expiry_date, supplier_id, supplier_name,
            supplier_contect_no, supplier_location, stock_used, stock_needed
        } = req.body;

        // ✅ Fix: Insert unique `_id`
        const newPharmacy = await Pharmacy.create({
            _id: pId,
            drug_name, category, usage, form, dosage, manufacturer,
            buying_date, expiry_date, supplier_id, supplier_name,
            supplier_contect_no, supplier_location, stock_used, stock_needed
        });

        res.status(201).json(newPharmacy);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

// ✅ Fix: Get all pharmacy records
export const GetAll = async (req, res) => {
    try {
        const pharmacies = await Pharmacy.find({});
        res.status(200).json(pharmacies);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

// ✅ Fix: Get a single record
export const GetSingleData = async (req, res) => {
    const { id } = req.params;

  
    try {
        const pharmacy = await Pharmacy.findById(id);
        if (!pharmacy) return res.status(404).json({ message: 'Data not found!' });

        res.status(200).json(pharmacy);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

// ✅ Fix: Proper update function
export const UpdateData = async (req, res) => {
    const { id } = req.params;


    try {
        const updatedPharmacy = await Pharmacy.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedPharmacy) return res.status(404).json({ message: 'Data not found' });

        res.status(200).json(updatedPharmacy);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

// ✅ Fix: Proper delete function
export const DeleteData = async (req, res) => {
    const { id } = req.params;

   

    try {
        const deletedPharmacy = await Pharmacy.findByIdAndDelete(id);

        if (!deletedPharmacy) return res.status(404).json({ message: 'Data not found' });

        res.status(200).json(deletedPharmacy);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

// ✅ Fix: Export correct function names
export default {
    CreateTable,
    GetAll,
    GetSingleData,
    UpdateData, // Fixed function name (was UpdataData)
    DeleteData
};
