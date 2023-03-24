import "./App.css";
import * as React from "react";
import { useState, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
function App() {
  const [title, setTitle] = useState("");
  const [tasks, settasks] = useState([]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:5006/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setTitle("");
  };
  async function handleDelete (taskId:string) {
    await fetch(`http://localhost:5006/tasks/${taskId}`, {
      method: "DELETE",
    });
  }
  useEffect(() => {
    async function fetchData() {
      const tasks = await fetch("http://localhost:5006/tasks");
      const response = await tasks.json();
      settasks(response);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="max-w-lg mx-auto items-center mt-10 w-full h-full ">
        <form
          className="bg-slate-50 shadow-md rounded p-10 mb-4"
          onSubmit={handleSubmit}
        >
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
                setTitle(e.currentTarget.value);
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
      <div className="sm:w-10/12 w-10/12 mx-auto p-10 flex flex-wrap justify-center">
        {tasks.map((item, index) => (
          <div
            key={item._id}
            className="bg-slate-50 shadow-sm m-2 text-center sm:w-2/12 w-5/12 rounded-md inline-block"
          >
            <div className="flex justify-between p-2">
              <button className=" text-slate-400" onClick={() => handleDelete(item._id)}>
                <AiOutlineCloseCircle />
              </button>
              <button className=" text-slate-400">
                <BiDotsVerticalRounded />
              </button>
            </div>
            <hr className=" bg-slate-100"></hr>
            <p className="p-2 mt-3 mb-10 w-auto inline-block text-slate-600">{item.title}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
