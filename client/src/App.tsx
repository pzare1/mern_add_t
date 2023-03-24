import "./App.css";
import * as React from 'react';
import { useState, useEffect } from 'react';

function App() {
  const [title, setTitle] = useState('');
  const [tasks, settasks] = useState([])
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:5006/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setTitle('');
  }
  useEffect(() => {
    async function fetchData() {
      const tasks =  await fetch('http://localhost:5006/tasks');
      const response = await tasks.json()
      settasks(response)
    }
    fetchData();
  }, [])
  

  return (
    <>
      <div className="max-w-lg mx-auto items-center mt-10 w-full h-full ">
        <form className="bg-slate-50 shadow-md rounded p-10 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-cyan-800 text-xl text-center font-light mb-2"
              htmlFor="task"
            >
              Add New Task
            </label>
            <input
              className="shadow appearance-none border p-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="task"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTitle(e.currentTarget.value)
              }}
              type="text"
              placeholder="Write your Task"
              value={title}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-cyan-500 hover:bg-cyan-800 w-full transition-all duration-300 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={!title}
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
      <div className="w-8/12 mx-auto p-10 flex justify-between text-center align-middle flex-wrap">
        {tasks.map((item) => (
          <div className=" bg-slate-50 shadow-sm p-10 m-2 text-center w-2/12 rounded-sm">{item.title}</div>
        ))}
      </div>
    </>
  );
}

export default App;
