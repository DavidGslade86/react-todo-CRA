import React from "react"
import './App.css'
import SideNavBar from './components/SideNavBar'
import ListPage from './components/ListPage'
import {BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import PropType from 'prop-types';

Redirector.propTypes = {
  currentList: PropType.object.isRequired,
  allLists: PropType.array.isRequired,
  isLoading: PropType.bool.isRequired,
}

function Redirector({ currentList, allLists, isLoading }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (currentList && currentList.id) {
      navigate(`/list/${currentList.id}`);
    } else if (!isLoading && allLists.length === 0) {
      navigate("/welcome");
    }
  }, [currentList, navigate, isLoading, allLists]);

    // side effect - renders loading page if isLoading and no current list
  return (
    <div className="container">
      <div className="contents">
        <div className="titleContainer">
          <h1 className="title">YOUR TODOS ARE COMING...</h1>
        </div>
      </div>
    </div>
  );
}

function App() {

  //stateful variables for todo list and loading status
  const [allLists, setAllLists] = React.useState([]);
  const [currentList, setCurrentList] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [tablesLoading, setTablesLoading] = React.useState(true);

  //calls to Airtable API using fetch() 
  //converts retrieved data to array of list objects with "id" and "name" key values
  //"id" is used for fetching individual lists 

  const handleSetCurrentList = (id, activeList, shouldSetLoading = true) => {
    const currentList = allLists.find(list => list.id === id);
    if (currentList.id === activeList.id) {
      return;
    }
    setCurrentList(currentList);
    if (shouldSetLoading) {
      setIsLoading(true);
    }
  };

  const fetchTableData = async () => {
    const options = {
      method: "GET",
      headers: 
        {Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`}
    };

    const url = `https://api.airtable.com/v0/meta/bases/${process.env.REACT_APP_AIRTABLE_BASE_ID}/tables`

    try{
      const response = await fetch(url, options)
      if(!response.ok){
        console.log(response)
        const errMessage = `${response.status}`
        throw new Error(errMessage);
      }

      const tableData = await response.json();

      const lists = tableData.tables
        .filter(table => table.name !== table.id)
        .map(table => ({id : table.id, name : table.name, description: table.de}));
      
      return lists

      } catch (error) {
        console.log(error.message)
      }
    }

  //useEffect called on mount which updates the todoList and allList variables after successful API call
  React.useEffect(() => {
    const fetchData = async function () {
      try {
        const lists = await fetchTableData();
        setAllLists(lists);
        
        if(lists.length > 0) {
          setCurrentList(lists[0]);
        }
        setTablesLoading(false);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false); // Set loading to false regardless of success or error
      }
    }
    fetchData();
}, []);

    //updates Airtable through API with new user generated Lists
  const addList = async (newList) => {

    const newListData = {
      'description':`A todo list concerning ${newList}`,
      'fields': [
        {
          "description": `${newList} items`,
          "name": "title",
          "type": "singleLineText"
        },
        {
          "name": "completedAt",
          "type": "date",
          "options": {
            "dateFormat": {
              "name": "iso",
              "format": "YYYY-MM-DD"
            }
          }
        },
        {
          "name": "completedBy",
          "type": "date",
          "options": {
            "dateFormat": {
              "name": "iso",
              "format": "YYYY-MM-DD"
            }
          }
        }
      ],
      'name': `${newList}`
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
      },
      body: JSON.stringify(newListData)
    };

    const url = `https://api.airtable.com/v0/meta/bases/${process.env.REACT_APP_AIRTABLE_BASE_ID}/tables`
    
    try{

      const response = await fetch(url, options);

      if(!response.ok) {
        const errorMessage = `Error: ${response.status} - ${response.statusText}`;
        const responseBody = await response.json(); // Log the response body for more details.
        console.error(errorMessage, responseBody);
        throw new Error(errorMessage);
      }

      const data = await response.json();

      const addedListFromAPI = {
        id: data.id,
        name:data.name
      }

      setAllLists([...allLists, addedListFromAPI]);

    } catch (error) {
      console.log(error.message)
    }

  }

  return (
    <div className="App">
      <BrowserRouter>
        <SideNavBar
          onAddList={addList}
          lists={allLists}
          isLoading ={tablesLoading}
          setActiveList={handleSetCurrentList}
          activeList = {currentList}
          updateLists ={setAllLists}
          setIsLoading={setIsLoading}
        />
          <Routes>
            <Route path="/welcome" element={
              <div className="container">
                <div className="contents">
                  <div className="titleContainer welcomeTitleContainer">
                    <h1 className="title" >Welcome to GetITDone</h1>
                    <h2 className="title" >Add a List Name and Click the plus button on the side menu to create a new list</h2>
                  </div>
                </div>
              </div>
            } />
            <Route path="/" element={<Redirector currentList={currentList} allLists ={allLists} isLoading= {isLoading} />}/>
            <Route 
              path="/list/:listId" 
              element={<ListPage
                activeList={currentList}
                isLoading ={isLoading}
                setLoading ={setIsLoading}
              />}
            />
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App