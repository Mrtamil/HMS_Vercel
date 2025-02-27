import mongoose from "mongoose";


const bloodBankSchema = new mongoose.Schema({
    _id:{type:String, require:true},
    Blood_Group: { type: String, required: true },
    Volume: { type: String },
    Storage_Temp: { type: String },
    Location: { type: String },
    Collection_Date: { type: String },
    Expiry_Period: { type: String },
    Status: { type: String },  
}, { timestamps: true } );


const BloodBank = mongoose.models.BloodBank || mongoose.model("BloodBank", bloodBankSchema);
export default BloodBank;