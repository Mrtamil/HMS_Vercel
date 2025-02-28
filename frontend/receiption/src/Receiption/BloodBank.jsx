import React, { useState, useEffect } from "react";
import axios from "axios";
import 'dotenv/config';


const BloodBankDashboard = () => {
  
  const [bloods, setBloods] = useState([]);

  useEffect(() => {
      axios.get(process.env.VITE_BACKEND_URL+"api/bloodbank/gab/")
          .then(res => setBloods(res.data)) 
          .catch(err => console.error(err));
  }, []);

  return (
    <div className=" bg-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Blood Bank Dashboard</h1>

      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-[#2E8BE1] text-white">
          <tr>
            <th className="p-3">Blood Group</th>
            <th className="p-3">Stock Available</th>
          </tr>
        </thead>
        <tbody>
        {bloods.map((entry) => (
              <tr key={entry.id} className="border-b">
                <td className="p-3 text-center">{entry.Blood_Group}</td>
                <td className="p-3 text-center">{entry.Volume} Units</td>
                
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default BloodBankDashboard;
