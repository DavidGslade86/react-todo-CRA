import React from "react"
import '../App.css'
import TodoList from './TodoList'
import AddTodoForm from "./AddTodoForm"
import { useParams } from "react-router-dom";
import PropType from 'prop-types';

ListPage.propTypes = {
  activeList: PropType.object.isRequired,
  setLoading: PropType.func.isRequired,
  isLoading: PropType.bool.isRequired
}  

export default function ListPage(props) {
    
    const { listId } = useParams();

    const {activeList, isLoading, setLoading} = props;

    const [todoList, setTodoList] = React.useState([]);
 
    //API call for individual list information
    //uses data from previous API call to generate list
    const fetchActiveListData = async (currentListId) => {
      
        const options = {
            method: "GET",
            headers: 
            {Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`}
        };
    
        const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${currentListId}?view=Grid%20view`
    
        try{
            const response = await fetch(url, options)
            if(!response.ok){
            console.log(response)
            const errMessage = `${response.status}`
            throw new Error(errMessage);
            }
    
            const data = await response.json();
    
            const todos = data.records.map(record => ({ 
              id : record.id, 
              title : record.fields.title || "", 
              completedBy : record.fields.completedBy || null, 
              completedAt : record.fields.completedAt || null
            }));
    
            return todos
    
        } catch (error) {
            console.log(error.message)
        }
    }
  
    React.useEffect(() => {

      const fetchListData = async function () {
          try {

              const cachedItem = localStorage.getItem(`${listId}TodoList`);

              if(cachedItem){
                setTodoList(JSON.parse(cachedItem));
                setLoading(false);
                return;
              }

              const todos = await fetchActiveListData(listId);

              setTodoList(todos);
              setLoading(false);

          } catch (error) {

              console.error(error.message);
              setLoading(false);
              
          }
      }
        fetchListData();
    }, [listId, setLoading]); 

    React.useEffect(()=>{
        if(isLoading === false && localStorage.getItem(`${activeList.id}TodoList`) === null){
        localStorage.setItem(`${activeList.id}TodoList`, JSON.stringify(todoList))
        } 
    }, [todoList, isLoading, activeList]);

    //updates Airtable through API with new user generated todoList item
    const addTodo = async (newTodo) => {
        const newTodoData = {
          fields: {
              title: newTodo.title
          }
        };

        const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
        },
        body: JSON.stringify(newTodoData)
        };

        const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${listId}`
        
        try{

          const response = await fetch(url, options);

          if(!response.ok) {
              const message = `Error has occurred: ${response.status}`;
              throw new Error(message)
          }

          const data = await response.json();

          const addedTodoFromAPI = {
              id: data.id,
              title:data.fields.title,
              completedAt: data.fields.completedAt || null,
              completedBy:data.fields.completedBy || null
          }

          setTodoList([...todoList, addedTodoFromAPI]);
          localStorage.setItem(`${listId}TodoList`, JSON.stringify([...todoList, addedTodoFromAPI]));

        } catch (error) {
          console.log(error.message)
        }
    }
  
    //updates todo list state to current array minus item of id in argument 
    const removeTodo = async (id) => { 
      const delUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${listId}/${id}` 
      const auth = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
        }
      }
  
      console.log("Removing Todo with ID:", id);
  
      try{
  
        const response = await fetch(delUrl, auth);
  
        if(!response.ok) {
          const message = `Error has occurred: ${response.status}`;
          throw new Error(message)
        }
  
        const data = await response.json();
  
        const apiDelData = {
          id: data.id,
          deleted: data.deleted
        }
  
        if(apiDelData.deleted){
          setTodoList(todoList.filter(todo => todo.id !== id));
          localStorage.setItem(`${listId}TodoList`, JSON.stringify(todoList.filter(todo => todo.id !== id)));
        }      
      
      } catch (error) {
        console.log(error.message)
      }
    }

    //generic API Call that updates list information.
    const updateListData = async (recordTitle, newData, recordID) => {
    
      const updatedTodoData = {
          fields: {
              [recordTitle]: newData
          }
      };
  
      const options = {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
          },
          body: JSON.stringify(updatedTodoData)
      };
  
      const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${listId}/${recordID}`;
      
      try {
          const response = await fetch(url, options);
  
          if (!response.ok) {
              const message = `Error has occurred: ${response.status}`;
              throw new Error(message);
          }
  
          const data = await response.json();
  
          // Create a new array with the updated todo
          const updatedTodos = todoList.map(todo => {
              if (todo.id === recordID) {
                  return { ...todo, [recordTitle]: data.fields[recordTitle] };
              }
              return todo;
          });
  
          setTodoList(updatedTodos);
          localStorage.setItem(`${listId}TodoList`, JSON.stringify(updatedTodos));
  
      } catch (error) {
          console.log(error.message);
      }
    }

    return(
            <div className="container">
              <div className="contents">
                {isLoading ? (<p className="title bold">Loading...</p>) : 
                  <>
                    <div className="titleContainer">
                      <h1 className="title">{activeList.name}</h1>
                    </div>
                    <TodoList 
                      todoList = {todoList}
                      setList = {setTodoList}
                      onRemoveTodo = {removeTodo}
                      onUpdateTodo={updateListData}
                    />
                  </>
                }
                <AddTodoForm
                  onAddTodo = {addTodo}
                />
              </div>
            </div>
    )
  }