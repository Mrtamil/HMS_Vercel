import mongoose from "mongoose";


const pharmacySchema = new mongoose.Schema({

        _id:{type:String,require:true},
        drug_name:{type:String,require:true},
        category:{type:String},
        usage:{type:String},
        form:{type:String},
        dosage:{type:String},
        manufacturer:{type:String},
        buying_date:{type:String},
        expiry_date:{type:String},
        supplier_id:{type:String},
        supplier_name:{type:String},
        supplier_contect_no:{type:Number},
        supplier_location:{type:[String]},
        stock_used:{type:String},
        stock_needed:{type:String},
    }, { timestamps: true })

const Pharmacy = mongoose.models.Pharmacy || mongoose.model("Pharmacy", pharmacySchema);

export default Pharmacy;
