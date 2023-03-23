import "./App.css";
import * as React from 'react';
import { useState } from 'react';
function App() {
  const [title, settitle] = useState('')
  return (
    <>
    <div className="">
      <div className="max-w-lg mx-auto items-center mt-10 w-full h-full ">
        <form className="bg-slate-50 shadow-md rounded p-10 mb-4">
          <div className="mb-4">
            <label
              className="block text-cyan-800 text-xl text-center font-light mb-2"
              htmlFor="task"
            >
              Add New Task
            </label>
            <input
              className="shadow appearance-none border p-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="task"
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                settitle(e.target.value)
              }}
              type="text"
              placeholder="Write your Task"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-cyan-500 hover:bg-cyan-800 w-full transition-all duration-300 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
      </div>
    </>
  );
}

export default App;
