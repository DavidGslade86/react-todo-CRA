import React from "react"
import './App.css'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'

function App() {

  //stateful variables for todo list and loading status
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  //promise based useEffect to simulate API call
  //resolves after 2 seconds then creates data object with todolist key set to local storage "savedTodoList"
  React.useEffect(() => {
    new Promise(
      (resolve, reject) => {
        setTimeout(() => resolve({data:{"todoList": JSON.parse(localStorage.getItem("savedTodoList")) || [] }}), 
      2000)}
    ).then((result => {
      setTodoList(result.data.todoList)
      setIsLoading(false);
    }));
  }, [])

  //sets local storage "savedTodoList" to stateful variable todoList when loading is complete
  React.useEffect(()=>{
    if(isLoading === false){
      localStorage.setItem("savedTodoList", JSON.stringify(todoList))
    } 
  }, [todoList, isLoading]);
  
  //creates array of objects with unique ID key and user generated title
  const addTodo = (newTodo) => {
    setTodoList(prevList => ([...prevList, newTodo]));
  }

  //updates todo list state to array without item of given id
  const removeTodo =(id) => {
    setTodoList(prevList => prevList.filter(listItem => listItem.id !== id));
  }

  return (
    < div className="container">
      <h1 className="title">Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? (<p className="side--marg bold">Loading...</p>) : 
      <TodoList 
        todoList = {todoList}
        onRemoveTodo = {removeTodo}
      />}
    </div>
  )
}

export default App
