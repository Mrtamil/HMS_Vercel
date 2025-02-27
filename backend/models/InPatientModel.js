import mongoose from "mongoose";

const InPatient = new mongoose.Schema(
    {
        _id:{type:String},
        Patient_Name:{type:String, require: true},
        Age_Sex:{type:String,require:true},
        Unit:{type:String},
        Admit_Date:{type:String},
        Valid_Upto:{type:String},
        CMCHIS:{type:String},
        MLRS:{type:String},
        MLC:{type:String},
        OP_Room_No:{type:String},
        Reason:{type:String},
        Department:{type:String},
        Doctor:{type:String},
        Emergency_Contect:{type:String},
        BloodGroup:{type:String},
        Married_Status:{type:String},
        Payment:{type:String},
    },{ timestamps: true }
)

const Inpatient = mongoose.models.Inpatient || mongoose.model("inpatient", InPatient);

export default Inpatient;