import './App.css'

//array to store list items
const todoList = [
  { id: 1, title: 'Complete Assignment' },
  { id: 2, title: 'Complete Reading' },
  { id: 3, title: 'Annotate notes' },
  { id: 4, title: 'Watch Videos and update notes' }
]

//map function to create list items from todoList array
let listItem = todoList.map(item => (
    <li className="list--items" key={item.id}>
      {item.title}
    </li>
  ))


function App() {

  return (
    < div className="container">
      <h1 className="title">Todo List</h1>
      <ul>
        {listItem}
      </ul>
    </div>
  )
}

export default App