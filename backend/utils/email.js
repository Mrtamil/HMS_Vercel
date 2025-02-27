
//  import nodemailer from 'nodemailer'
// const sendMailtoUser = async(email, docData, slotDate, slotTime,  userData) => {
//     try {
        
//         const transporter = nodemailer.createTransport({
//               service: "gmail",
//               auth: {
//                 user: "yokidevdoc@gmail.com",
//                 pass: "lxwu pkhv qjla ubxl"
//               }
//         });
//         const mailOptions = {
//             from: "yokidevdoc@gmail.com",
//             to: email,
//             subject: "Appointment Confirmation",
//             text : `Dear ${ userData},

//             We are pleased to confirm your appointment at MediCure Hospital. Below are the details,
            
            
//             Doctor Name : ${docData},
//             Appointment Date : ${slotDate},
//             AppointmentTime : ${slotTime},
//             Location: MediCure Hospital
//             Please arrive 10 minutes early and bring any necessary documents. If you need to reschedule, contact us at [medicure@gmail.com].
            
//             We look forward to serving you!
            
//             Best regards,
//             MediCure Hospital Team
//             [medicure@gmail.com]
//             [0987654321]`
            
            
//             // text: `Your patientId is ${patientId} & appointment with Dr. ${doctor}  on  ${appointmentDate}  at  ${appointmentTime} has been confirmed.`
//         }

//         await transporter.sendMail(mailOptions);
              
//     } catch (error) {
//         console.log(error);        
//     }
// };
// export default sendMailtoUser;