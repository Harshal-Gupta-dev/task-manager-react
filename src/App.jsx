import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import Navbar from './components/Navbar.jsx'
import heroImg from './assets/hero.png'
import { stringify, v4 as uuidv4 } from "uuid";
import './App.css'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [error, setError] = useState("")
  const [Editid, setEditid] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false);

  // 2. Load Effect
  useEffect(() => {
    const data = localStorage.getItem("todos");
    if (data) {
      setTodos(JSON.parse(data));
    }
    setIsLoaded(true); // Mark as loaded even if storage was empty
  }, []);

  // 3. Save Effect
  useEffect(() => {
    // ONLY save if the initial load from localStorage is finished
    if (isLoaded) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  const handleChange = (e) => {
    setTodo(e.target.value);

  }
  const handleAdd = () => {
    if (todo == "") {
      return setError("Task connot be Empty")
    }
    if (Editid) {
      setTodos(todos.map(item =>
        item.id == Editid ? { ...item, todo: todo } : item
      ))
      setEditid("");
    }
    else {
      setTodos([...todos, { id: uuidv4(), todo: todo, isCompleted: false }])
    }
    setTodo("");
    setError("")

  }
  const handleCheck = (id) => {
    console.log(`checkbox id is ${id}`);
    setTodos(todos.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isCompleted: !item.isCompleted
        }
      }
      return item; 
    }))

  }


  const handleEdit = (id) => {
    const find = todos.find(item => {
      if (item.id == id) {
        return item
      }
    })
    setTodo(find.todo)
    setEditid(id)

  }

  // by chatgpt
  //   const handleEdit = (id) => {
  //   const selected = todos.find(item => item.id === id);

  //   setTodo(selected.todo);
  //   setEditid(id);
  // };

  const handleDelete = (id) => {
    console.log(id);
    setTodos(todos.filter(item => item.id !== id)
    )

  }

  return (
    <>
      <Navbar />
      <div className="addtodo bg-slate-300 max-w-[1100px] mx-auto my-2 border-0 rounded-xl p-2 min-h-[20vw]">
        <h1 className='text-2xl font-bold mx-2 p-2'>Add Todos</h1>
        <div className="flex  my-1 gap-4 mx-auto">
          <input onChange={handleChange} onKeyDown={(e) => { if (e.key === "Enter") { handleAdd(); } }} value={todo} className=' w-[65vw] p-2 rounded-xl  bg-white' type="text" name="" id="" placeholder='Write your todo' />
          <button type="button" onClick={handleAdd} className=' bg-white border-0 p-2 rounded-xl hover:cursor-pointer active:scale-95 active:bg-gray-200 transition-all duration-150'>
            {Editid ? "Update" : "Add"}
          </button>
        </div>
        <h1 className='text-2xl font-bold mx-1 p-1'>Your Todos</h1>
        {error && <div className='text-red-600 font-bold'>{error}</div>}
        {todos.length === 0 && <div className='mx-[31vw] font-bold'>No item found</div>}
        {todos.map(item => {
          return <div key={item.id} className="Yourtodos  p-1 border-0 rounded-xl flex flex-col">
            <div className="listtodos flex justify-between items-center">
              <div className='flex gap-2'>
                <input onChange={() => { handleCheck(item.id) }} type="checkbox" name="" id="" />
                <div className={`text mx-1 text-2xl ${item.isCompleted ? "line-through" : ""}`}>{item.todo}</div>
              </div>
              <div className="buttons flex gap-2">
                <button onClick={() => { handleEdit(item.id) }} className="p-2 bg-white rounded-xl hover:cursor-pointer active:scale-95">Edit</button>
                <button onClick={() => { handleDelete(item.id) }} className="p-2 bg-white rounded-xl hover:cursor-pointer active:scale-95">Delete</button>
              </div>
            </div>
          </div>
        })}
      </div>


    </>

  )
}

export default App
