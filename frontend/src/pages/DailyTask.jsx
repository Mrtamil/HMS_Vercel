import React, { useState, useEffect } from "react";

const PatientDailyTasks = () => {
  const defaultTasks = [
    { id: 1, text: "Take morning medicine", completed: false },
    { id: 2, text: "Drink 2 liters of water", completed: false },
    { id: 3, text: "30-minute light exercise", completed: false },
    { id: 4, text: "Eat a balanced meal", completed: false },
    { id: 5, text: "Sleep at least 7 hours", completed: false },
  ];

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("patientTasks"));
    if (savedTasks && new Date().getDate() === new Date(savedTasks.date).getDate()) {
      setTasks(savedTasks.data);
    } else {
      setTasks(defaultTasks);
      localStorage.setItem("patientTasks", JSON.stringify({ date: new Date(), data: defaultTasks }));
    }
  }, []);

  useEffect(() => {
    tasks.forEach((task) => {
      if (!task.completed) {
        setTimeout(() => alert(`Reminder: ${task.text}`), 5000);
      }
    });
  }, [tasks]);

  useEffect(() => {
    setTimeout(() => alert("Don't forget to complete your daily tasks!"), 3000);
  }, []);

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("patientTasks", JSON.stringify({ date: new Date(), data: updatedTasks }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center w-full">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Daily Health Tasks</h2>
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex justify-between p-3 my-2 border rounded-lg ${
                task.completed ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <span className={task.completed ? "line-through" : ""}>{task.text}</span>
              <button
                className="bg-[#2E8BE1] text-white px-3 py-1 rounded"
                onClick={() => toggleTask(task.id)}
              >
                {task.completed ? "Undo" : "Done"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PatientDailyTasks;
