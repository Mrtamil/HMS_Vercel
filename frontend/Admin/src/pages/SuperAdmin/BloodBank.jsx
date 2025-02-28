import { useState, useEffect } from "react";
import axios from 'axios';
import 'dotenv/config';


const Drugs = () => {

  const [form, setForm] = useState({

    Blood_Group:"",
    Volume:"",
    Storage_Temp:"",
    Location:"",
    Collection_Date:"",
    Expiry_Period:"",
    Status:""
  });

  

  const [entries, setEntries] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [updateId, setUpdateId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch Data on Component Mount
  const getData = async () => {
    try {
      const response = await axios.get(process.env.VITE_BACKEND_URL+"api/bloodbank/gab/");
      setEntries(response.data);
      setFilteredPatients(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Update search results dynamically
  useEffect(() => {
    if (!searchQuery) {
      setFilteredPatients(entries);
      return;
    }

    const filtered = entries.filter(
      (entry) =>
        entry.Blood_Group.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry._id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredPatients(filtered);
  }, [searchQuery, entries]);

  // Handle Input Changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (updateId) {
      await axios.put(process.env.VITE_BACKEND_URL+`api/bloodbank/ub/${updateId}`, form);
      setUpdateId(null);
    } else {
      try {
        const response = await axios.post(
          process.env.VITE_BACKEND_URL+"api/bloodbank/pb", 
          form, 
          { headers: { "Content-Type": "application/json" } }
        );
    
        console.log("Response Data:", response.data);
      } catch (error) {
        console.error("Axios Error:", error.response?.data || error.message);
      }
       
    }

    setForm({
     
      Blood_Group:"",
      Volume:"",
      Storage_Temp:"",
      Location:"",
      Collection_Date:"",
      Expiry_Period:"",
      Status:""
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
    await axios.delete(process.env.VITE_BACKEND_URL+`api/bloodbank/db/${id}`);
    getData();
  };
  
  return (
    <div className="flex h-screen w-screen">
      <main className="flex-auto bg-gray-100 p-5">
        <h1 className="text-2xl font-semibold">Manage Patient Medicines</h1>

        <input
          type="text"
          placeholder="Search by Drug Id or Drug Name"
          value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded w-full mt-4 mb-4"
        />

        <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded 
        ">
         
          <input type="text" name="Blood_Group" value={form.Blood_Group} onChange={handleChange} placeholder="Blood_Group" className="p-2 border rounded w-100 mb-2 ml-3" required />
          <input type="text" name="Volume" value={form.Volume} onChange={handleChange} placeholder="Volume" className="p-2 border rounded w-100 mb-2 ml-3" required />
          <input type="text" name="Storage_Temp" value={form.Storage_Temp} onChange={handleChange} placeholder="Storage_Temp" className="p-2 border rounded w-100 mb-2 ml-3" required />
          <input type="text" name="Location" value={form.Location} onChange={handleChange} placeholder="Location" className="p-2 border rounded w-100 mb-2 ml-3" required />
          <input type="text" name="Collection_Date" value={form.Collection_Date} onChange={handleChange} placeholder="Collection_Date" className="p-2 border rounded w-100 mb-2 ml-3" required />
          <input type="text" name="Expiry_Period" value={form.Expiry_Period} onChange={handleChange} placeholder="Expiry_Period" className="p-2 border rounded w-100 mb-2 ml-3" required />
          <input type="text" name="Status" value={form.Status} onChange={handleChange} placeholder="Status" className="p-2 border rounded w-100 mb-2 ml-3" required />
        
          <button type="submit" className="bg-[#2E8BE1] text-white p-2 rounded ml-3">
            {form.id ? "Update" : "Add"} Blood
          </button>
        </form>

        <div className="mt-5">
          <h2 className="text-xl font-semibold">Blood Bank Records</h2>
          <table className="bg-white shadow mt-2">
            <thead>
              <tr className="bg-blue-800 text-white">
                <th className="p-2">Blood Id</th>
                <th className="p-2">Blood Group</th>
                <th className="p-2">Volume</th>
                <th className="p-2">Storage Temp</th>
                <th className="p-2">Location</th>
                <th className="p-2">Collection Date</th>
                <th className="p-2">Expiry_Period</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((entry) => (
                <tr key={entry.id} className="border-t">
                  <td className="p-2">{entry._id}</td>
                  <td className="p-2">{entry.Blood_Group}</td>
                  <td className="p-2">{entry.Volume}</td>
                  <td className="p-2">{entry.Storage_Temp}</td>
                  <td className="p-2">{entry.Location}</td>
                  <td className="p-2">{entry.Collection_Date}</td>
                  <td className="p-2">{entry.Expiry_Period}</td>
                  <td className="p-2">{entry.Status}</td>
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

export default Drugs;
