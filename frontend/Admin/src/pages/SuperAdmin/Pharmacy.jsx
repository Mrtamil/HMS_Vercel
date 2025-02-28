import { useState, useEffect } from "react";
import axios from 'axios';
import 'dotenv/config';

const Drugs = () => {

  const [form, setForm] = useState({

      drug_name: "",
      category: "",
      usage: "",
      form: "",
      dosage: "",
      manufacturer: "",
      buying_date: "",
      expiry_date: "",
      supplier_id: "",
      supplier_name: "",
      supplier_contect_no: "",
      supplier_location: "",
      stock_used: "",
      stock_needed: ""
  });

  

  const [entries, setEntries] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [updateId, setUpdateId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch Data on Component Mount
  const getData = async () => {
    try {
      const response = await axios.get(process.env.VITE_BACKEND_URL+"api/pharmecy/gap/");
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
        entry.Drug_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.DrugId.toLowerCase().includes(searchQuery.toLowerCase())
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
      await axios.put(process.env.VITE_BACKEND_URL+`api/pharmecy/up/${updateId}`, form);
      setUpdateId(null);
    } else {
      try {
        const response = await axios.post(
          process.env.VITE_BACKEND_URL+"api/pharmecy/pp", 
          form, 
          { headers: { "Content-Type": "application/json" } }
        );
    
        console.log("Response Data:", response.data);
      } catch (error) {
        console.error("Axios Error:", error.response?.data || error.message);
      }
       
    }

    setForm({
     
      drug_name: "",
      category: "",
      usage: "",
      form: "",
      dosage: "",
      manufacturer: "",
      buying_date: "",
      expiry_date: "",
      supplier_id: "",
      supplier_name: "",
      supplier_contect_no: "",
      supplier_location: "",
      stock_used: "",
      stock_needed: ""
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
    await axios.delete(process.env.VITE_BACKEND_URL+`api/pharmecy/dp/${id}`);
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
         
          <input type="text" name="drug_name" value={form.drug_name} onChange={handleChange} placeholder="DrugName" className="p-2 border rounded w-100 mb-2 ml-3" required />
          <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Category" className="p-2 border rounded w-100 mb-2 ml-3" required />
          <input type="text" name="usage" value={form.usage} onChange={handleChange} placeholder="Usage" className="p-2 border rounded w-100 mb-2 ml-3" required />
          <input type="text" name="form" value={form.form} onChange={handleChange} placeholder="Form" className="p-2 border rounded w-100 mb-2 ml-3" required />
          <input type="text" name="dosage" value={form.dosage} onChange={handleChange} placeholder="Dosage" className="p-2 border rounded w-100 mb-2 ml-3" required />
          <input type="text" name="manufacturer" value={form.manufacturer} onChange={handleChange} placeholder="Manufacture" className="p-2 border rounded w-100 mb-2 ml-3" required />
          <input type="text" name="buying_date" value={form.buying_date} onChange={handleChange} placeholder="BuyingDate" className="p-2 border rounded w-100 mb-2 ml-3" required />
          <input type="text" name="expiry_date" value={form.expiry_date} onChange={handleChange} placeholder="ExpireDate" className="p-2 border rounded w-100 mb-2 ml-3" required />
          <input type="text" name="supplier_id" value={form.supplier_id} onChange={handleChange} placeholder="SupplierId" className="p-2 border rounded w-100 mb-2 ml-3" required />
          <input type="text" name="supplier_name" value={form.supplier_name} onChange={handleChange} placeholder="SupplierName" className="p-2 border rounded w-100 mb-2 ml-3" required />
          <input type="number" name="supplier_contect_no" value={form.supplier_contect_no} onChange={handleChange} placeholder="SupplierContact" className="p-2 border rounded w-100 mb-2 ml-3" required />
          <input type="text" name="supplier_location" value={form.supplier_location} onChange={handleChange} placeholder="SupplierLocation" className="p-2 border rounded w-100 mb-2 ml-3" required />
          <input type="text" name="stock_used" value={form.stock_used} onChange={handleChange} placeholder="StockUsed" className="p-2 border rounded w-100 mb-2 ml-3" required />
          <input type="text" name="stock_needed" value={form.stock_needed} onChange={handleChange} placeholder="StockNeeded" className="p-2 border rounded w-100 mb-2 ml-3" required />

          <button type="submit" className="bg-[#2E8BE1] text-white p-2 rounded ml-3">
            {form.id ? "Update" : "Add"} Medicine
          </button>
        </form>

        <div className="mt-5">
          <h2 className="text-xl font-semibold">Medicine Records</h2>
          <table className="bg-white shadow mt-2">
            <thead>
              <tr className="bg-blue-800 text-white">
                <th className="p-2">Drug Id</th>
                <th className="p-2">Drug Name</th>
                <th className="p-2">Category</th>
                <th className="p-2">Usage</th>
                <th className="p-2">Form</th>
                <th className="p-2">Dosage</th>
                <th className="p-2">Manufacture</th>
                <th className="p-2">Buying Date</th>
                <th className="p-2">Expire Date</th>
                <th className="p-2">Supplier Id</th>
                <th className="p-2">Supplier Name</th>
                <th className="p-2">Supplier Contact</th>
                <th className="p-2">Supplier Location</th>
                <th className="p-2">Stock Used</th>
                <th className="p-2">Stock Needed</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((entry) => (
                <tr key={entry.id} className="border-t">
                  <td className="p-2">{entry._id}</td>
                  <td className="p-2">{entry.drug_name}</td>
                  <td className="p-2">{entry.category}</td>
                  <td className="p-2">{entry.usage}</td>
                  <td className="p-2">{entry.form}</td>
                  <td className="p-2">{entry.dosage}</td>
                  <td className="p-2">{entry.manufacturer}</td>
                  <td className="p-2">{entry.buying_date}</td>
                  <td className="p-2">{entry.expiry_date}</td>
                  <td className="p-2">{entry.supplier_id}</td>
                  <td className="p-2">{entry.supplier_name}</td>
                  <td className="p-2">{entry.supplier_contect_no}</td>
                  <td className="p-2">{entry.supplier_location}</td>
                  <td className="p-2">{entry.stock_used}</td>
                  <td className="p-2">{entry.stock_needed}</td>
                 
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
