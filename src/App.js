import Header from "./components/Header";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";
import { useState, useEffect} from "react";

const App = () => {
    const [showAddTask, setShowAddTask] = useState(false)

    const [tasks, setTask] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTask(tasksFromServer)
    }

    getTasks();
  }, [])

  // fetch tasks
  const fetchTasks = async() => {
    const res = await fetch('http://localhost:3000/tasks')
    const data = await res.json()

    return data
  }

  // fetch task
  const fetchTask = async(id) => {
    const res = await fetch(`http://localhost:3000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  const addTask = async (task) => {
    const res = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTask([...tasks, data])

    /*const id = Math.floor(Math.random() * 10000) + 1
    const newTask = {id, ...task}
    setTask([...tasks, newTask])*/
  } 

  const deleteTask = async (id) => {
    await fetch(`http://localhost:3000/tasks/${id}` , 
    {
      method: 'DELETE',
    })

    setTask(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = async(id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, 
    reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTask(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: 
        data.reminder}: task
      )
    )
  }
  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask (!showAddTask)}
        showAdd={showAddTask}/>
        <Route path="/" exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask}/>}
            {tasks.length > 0 ? (<Tasks tasks={tasks} 
            onDelete={deleteTask} onToggle={toggleReminder}/>) 
            : ("No Tasks To Show You")}
          </>
        )
        } />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  )
}

export default App