import { useState, useEffect } from "react";
import axios from 'axios';


const Drugs = () => {


  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/pharmecy/gap/")
    .then(res => setMedicines(res.data))
    .catch(e => console.error(e))
  }, []);

  return (
    <div className="flex h-screen w-screen">
      <main className="flex-auto bg-gray-100 p-5">
        <h1 className="text-2xl font-semibold">Medicines</h1>

        {/* <input
          type="text"
          placeholder="Search by Drug Id or Drug Name"
          value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded w-full mt-4 mb-4"
        /> */}

      

        <div className="mt-5">
          <h2 className="text-xl font-semibold">Medicine Records</h2>
          <table className="bg-white shadow mt-2">
            <thead>
              <tr className="bg-blue-800 text-white">
                <th className="p-2">Drug Id</th>
                <th className="p-2">Drug Name</th>
                <th className="p-2">Category</th>
                <th className="p-2">Usage</th>
                <th className="p-2">Stock Used</th>
                <th className="p-2">Stock Needed</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((entry) => (
                <tr key={entry.id} className="border-t">
                  <td className="p-2">{entry._id}</td>
                  <td className="p-2">{entry.drug_name}</td>
                  <td className="p-2">{entry.category}</td>
                  <td className="p-2">{entry.usage}</td>
                  <td className="p-2">{entry.stock_used}</td>
                  <td className="p-2">{entry.stock_needed}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Drugs;
