import { useState, useEffect } from "react";
import axios from 'axios';

const InPatient = () => {
    const [form, setForm] = useState({

        Patient_Name:"",
          Age_Sex:"",
          Unit:"",
          Admit_Date:"",
          Valid_Upto:"",
          CMCHIS:"",
          MLRS:"",
          MLC:"",
          OP_Room_No:"",
          Reason:"",
          Department:"",
          Doctor:"",
          Emergency_Contect:"",
          BloodGroup:"",
          Married_Status:"",
          Payment:""
    });
  
    
  
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [updateId, setUpdateId] = useState(null);
  
    // Fetch Data on Component Mount
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/inpatient/gaip/");
        setEntries(response.data);
        setFilteredPatients(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    useEffect(() => {
      getData();
    }, []);
  
    // Handle Input Changes
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    // Handle Form Submission
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (updateId) {
        await axios.put(`http://localhost:5000/api/inpatient/uip/${updateId}`, form);
        setUpdateId(null);
      } else {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/inpatient/pip", 
            form, 
            { headers: { "Content-Type": "application/json" } }
          );
      
          console.log("Response Data:", response.data);
        } catch (error) {
          console.error("Axios Error:", error.response?.data || error.message);
        }
         
      }
  
      setForm({
       
        Patient_Name:"",
        Age_Sex:"",
        Unit:"",
        Admit_Date:"",
        Valid_Upto:"",
        CMCHIS:"",
        MLRS:"",
        MLC:"",
        OP_Room_No:"",
        Reason:"",
        Department:"",
        Doctor:"",
        Emergency_Contect:"",
        BloodGroup:"",
        Married_Status:"",
        Payment:""
      });
  
      getData();
    };
  
    // Handle Edit
    const handleEdit = (entry) => {
      setUpdateId(entry._id);
      setForm({ ...entry });
    };
  
    // Handle Delete
    const handleDelete = async (id) => {
      await axios.delete(`http://localhost:5000/api/inpatient/dip/${id}`);
      getData();
    };
    
    return (
      <div className="flex h-screen w-screen">
        <main className="flex-auto bg-gray-100 p-5">
          <h1 className="text-2xl font-semibold">InPatient Appointment</h1>
  
          <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded 
          ">
           
            <input type="text" name="Patient_Name" value={form.Patient_Name} onChange={handleChange} placeholder="Patient_Name" className="p-2 border rounded w-100 mb-2 ml-3" required />
            <input type="text" name="Age_Sex" value={form.Age_Sex} onChange={handleChange} placeholder="Age/Sex" className="p-2 border rounded w-100 mb-2 ml-3" required />
            <input type="text" name="Unit" value={form.Unit} onChange={handleChange} placeholder="Unit" className="p-2 border rounded w-100 mb-2 ml-3" required />
            <input type="text" name="Admit_Date" value={form.Admit_Date} onChange={handleChange} placeholder="Admit_Date" className="p-2 border rounded w-100 mb-2 ml-3" required />
            <input type="text" name="Valid_Upto" value={form.Valid_Upto} onChange={handleChange} placeholder="Valid_Upto" className="p-2 border rounded w-100 mb-2 ml-3" required />
            <input type="text" name="CMCHIS" value={form.CMCHIS} onChange={handleChange} placeholder="CMCHIS" className="p-2 border rounded w-100 mb-2 ml-3" required />
            <input type="text" name="MLRS" value={form.MLRS} onChange={handleChange} placeholder="MLRS" className="p-2 border rounded w-100 mb-2 ml-3" required />
            <input type="text" name="MLC" value={form.MLC} onChange={handleChange} placeholder="MLC" className="p-2 border rounded w-100 mb-2 ml-3" required />
            <input type="text" name="OP_Room_No" value={form.OP_Room_No} onChange={handleChange} placeholder="OP_Room_No" className="p-2 border rounded w-100 mb-2 ml-3" required />
            <input type="text" name="Reason" value={form.Reason} onChange={handleChange} placeholder="Reason" className="p-2 border rounded w-100 mb-2 ml-3" required />
            <input type="text" name="Department" value={form.Department} onChange={handleChange} placeholder="Department" className="p-2 border rounded w-100 mb-2 ml-3" required />
            <input type="text" name="Doctor" value={form.Doctor} onChange={handleChange} placeholder="Doctor" className="p-2 border rounded w-100 mb-2 ml-3" required />
            <input type="text" name="Emergency_Contect" value={form.Emergency_Contect} onChange={handleChange} placeholder="Emergency_Contect" className="p-2 border rounded w-100 mb-2 ml-3" required />
            <input type="text" name="BloodGroup" value={form.BloodGroup} onChange={handleChange} placeholder="BloodGroup" className="p-2 border rounded w-100 mb-2 ml-3" required />
            <input type="text" name="Married_Status" value={form.Married_Status} onChange={handleChange} placeholder="Married_Status" className="p-2 border rounded w-100 mb-2 ml-3" required />
            <input type="text" name="Payment" value={form.Payment} onChange={handleChange} placeholder="Payment" className="p-2 border rounded w-100 mb-2 ml-3" required />
           
  
            <button type="submit" className="bg-[#2E8BE1] text-white p-2 rounded ml-3">
              {form.id ? "Update" : "Add"} Submit
            </button>
          </form>
  
          <div className="mt-5">
            <h2 className="text-xl font-semibold">MEDICURE INPATIENT</h2>
            <table className="bg-white shadow mt-2">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th className="p-2">Patient_Name</th>
                  <th className="p-2">Age_Sex</th>
                  <th className="p-2">Unit</th>
                  <th className="p-2">Admit_Date</th>
                  <th className="p-2">Valid_Upto</th>
                  <th className="p-2">CMCHIS</th>
                  <th className="p-2">MLRS</th>
                  <th className="p-2">MLC</th>
                  <th className="p-2">OP_Room_No</th>
                  <th className="p-2">Reason</th>
                  <th className="p-2">Department</th>
                  <th className="p-2">Doctor</th>
                  <th className="p-2">Emergency_Contect</th>
                  <th className="p-2">BloodGroup</th>
                  <th className="p-2">Married_Status</th>
                  <th className="p-2">Payment</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((entry) => (
                  <tr key={entry.id} className="border-t">
                    <td className="p-2">{entry._id}</td>
                    <td className="p-2">{entry.Patient_Name}</td>
                    <td className="p-2">{entry.Age_Sex}</td>
                    <td className="p-2">{entry.Unit}</td>
                    <td className="p-2">{entry.Admit_Date}</td>
                    <td className="p-2">{entry.Valid_Upto}</td>
                    <td className="p-2">{entry.CMCHIS}</td>
                    <td className="p-2">{entry.MLRS}</td>
                    <td className="p-2">{entry.MLC}</td>
                    <td className="p-2">{entry.OP_Room_No}</td>
                    <td className="p-2">{entry.Reason}</td>
                    <td className="p-2">{entry.Department}</td>
                    <td className="p-2">{entry.Doctor}</td>
                    <td className="p-2">{entry.Emergency_Contect}</td>
                    <td className="p-2">{entry.BloodGroup}</td>
                    <td className="p-2">{entry.Married_Status}</td>
                    <td className="p-2">{entry.Payment}</td>
                    
                    <td className="p-2">
                      <button
                        onClick={() => handleEdit(entry)}
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(entry._id)}
                        className="bg-rose-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredPatients.length === 0 && (
              <p className="text-center text-gray-500 mt-2">No matching records found.</p>
            )} 
          </div>
        </main>
      </div>
    );
  };

export default InPatient;