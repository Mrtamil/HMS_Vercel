const mongoose = require('mongoose')

const paymentschema = new mongoose.Schema({
    razorpay_order_id : String,
    razorpay_payment_id : String,
    razorpay_signature : String,
    amount : Number,
    status: { type: String, default: "Pending" }
}, { timestamps : true })

const patientPayment = mongoose.model('PatientPayment', paymentschema)

module.exports = patientPayment