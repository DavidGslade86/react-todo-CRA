import React from "react"
import './App.css'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'


function App() {

  //state variable and set function to set state to value added by user input

  const useSemiPersistantState = () => {
    const [todoList, setTodoList] = React.useState(JSON.parse(localStorage.getItem("savedTodoList")) || []);

    React.useEffect(()=>{localStorage.setItem("savedTodoList", JSON.stringify(todoList))}, [todoList]);

    return [todoList, setTodoList]
  }

  const [todoList,setTodoList] = useSemiPersistantState();
  
  const addTodo = (newTodo) => {
    setTodoList(prevList => ([...prevList, newTodo]));
  }

  return (
    < div className="container">
      <h1 className="title">Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList 
        todoList = {todoList}
      />
    </div>
  )
}

export default App
