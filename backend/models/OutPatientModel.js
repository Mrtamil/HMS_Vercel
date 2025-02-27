import mongoose from "mongoose";


const OutPatient = new mongoose.Schema(
    {
        _id:{type:String, require:true},
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
        Payment:{type:String}
    }, { timestamps: true }
);



const Outpatient = mongoose.models.Outpatient || mongoose.model("Outpatient", OutPatient);

export default Outpatient;