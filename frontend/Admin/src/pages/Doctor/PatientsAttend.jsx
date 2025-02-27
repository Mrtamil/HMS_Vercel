import { useState, useEffect } from "react";

const PatientsAttended = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({ id: null, name: "", age: "", date: "", time: "", reason: "" });
  const [editing, setEditing] = useState(false);

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const storedPatients = localStorage.getItem("patients");
    if (storedPatients) {
      setPatients(JSON.parse(storedPatients));
    }
  }, []);

  // Save data to localStorage whenever the patient list updates
  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      setPatients(patients.map((patient) => (patient.id === formData.id ? formData : patient)));
      setEditing(false);
    } else {
      setPatients([...patients, { ...formData, id: Date.now() }]);
    }
    setFormData({ id: null, name: "", age: "", date: "", time: "", reason: "" });
  };

  const handleEdit = (patient) => {
    setFormData(patient);
    setEditing(true);
  };

  const handleDelete = (id) => {
    setPatients(patients.filter((patient) => patient.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Patients Attended</h1>
      <form onSubmit={handleSubmit} className="mb-4 space-y-2 bg-gray-100 p-4 rounded-lg">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Patient Name" className="w-full p-2 border rounded" required />
        <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" className="w-full p-2 border rounded" required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="reason" value={formData.reason} onChange={handleChange} placeholder="Reason for Visit" className="w-full p-2 border rounded" required />
        <button type="submit" className="w-full bg-[#2E8BE1] text-white p-2 rounded">
          {editing ? "Update" : "Add"} Patient
        </button>
      </form>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Age</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Reason</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id} className="text-center">
              <td className="border p-2">{patient.name}</td>
              <td className="border p-2">{patient.age}</td>
              <td className="border p-2">{patient.date}</td>
              <td className="border p-2">{patient.time}</td>
              <td className="border p-2">{patient.reason}</td>
              <td className="border p-2">
                <button onClick={() => handleEdit(patient)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(patient.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientsAttended;
