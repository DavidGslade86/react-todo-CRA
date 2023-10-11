import React from "react";
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/ClearOutlined';
import MyDateComponent from './MyDateComponent'
import PropType from 'prop-types';
import ModifyTitleForm from "./ModifyTitleForm";

const Li = styled.li `
box-sizing: border-box;
display: flex;
align-items: center;
justify-content: space-between;
border-radius: 5px;
margin: 0 12px 12px 12px;
padding: 10px;
font-weight: 600;
background-color: rgb(34, 1, 25);
box-shadow: 2px 2px 6px 0px rgba(108,0,0,0.72);
-webkit-box-shadow: 2px 2px 6px 0px rgba(108,0,0,0.72);
-moz-box-shadow: 2px 2px 6px 0px rgba(108,0,0,0.72);
width: 75%;
min-width:620px;
color:rgb(249, 212, 212);
transition: box-shadow .3s ease-out,-webkit-box-shadow .3s ease-out, -moz-box-shadow .3s ease-out;

&:hover {
    box-shadow: 2px 2px 6px 0px rgba(255, 98, 0, 0.622);
    -webkit-box-shadow: 2px 2px 6px 0px rgba(255, 98, 0, 0.622);
    -moz-box-shadow: 2px 2px 6px 0px rgba(255, 98, 0, 0.622);
    transition: box-shadow .3s ease-out,-webkit-box-shadow .3s ease-out, -moz-box-shadow .3s ease-out;
}

${props => props["data-iscompleted"] && `
background-color: rgb(188, 178, 186);
color: rgb(105, 94, 103);
`}

@media (min-width: 940px) {
    width: 75%;
    margin-left: 100px;
}

@media (min-width: 1300px) {
    width: 60%;
    margin-left: auto;
    margin-right: auto;
}
`;

const CheckContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    position: relative;
    justify-content: center;
    cursor: pointer;
    font-size: 22px;
    width: 20%;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    input {
        appearance: none;
        position: relative;
        cursor: pointer;
        height: 25px;
        width: 25px;
        background-color: transparent;
        outline: none;

        &::before {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            height: 25px;
            width: 25px;
            border: none;
            background-color: rgb(249, 212, 212);
        }

        &::after {
            content: "";
            position: absolute;
            display: none;  /* By default, the checkmark is hidden */
            top: 5px;     
            left: 9px;
            width: 6px;
            height: 12px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
        }

        &:checked::before {
            background-color: #503242;
        }

        &:checked::after {
            display: block;  /* Show the checkmark when the checkbox is checked */
        }
    }
`;

const LiTitle = styled.span `
box-sizing: border-box;
display: inline-block;
text-align: center;
width: 20%;

${props => props["data-iscompleted"] && `
text-decoration: line-through;
`}
`

const LiCompletedAt = styled.span `
box-sizing: border-box;
display: inline-block;
text-align: center;
width: 20%;
`

const LiButContain = styled.span `
box-sizing: border-box;
width: 20%;
display: flex;
justify-content: flex-end;
`

const Button = styled.button `
display: flex;
background-color: rgb(255, 126, 126);
border: none;
border-radius: 50%; 
height: 2em;
width: 2em;
justify-content: center;
align-items: center;

&:hover {
    background-color: rgb(255, 17, 17);
    transition: background-color .3s ease-in-out;
}
`

TodoListItems.propTypes = {
    todo: PropType.array.isRequired,
    onRemoveTodo: PropType.func.isRequired,
    setList: PropType.func.isRequired,
    onUpdateTodo: PropType.func.isRequired
}

export default function TodoListItems (props) {

    const {todo, onRemoveTodo, setList, onUpdateTodo} = props;

    const [isEditing, setIsEditing] = React.useState(null);

    const handleTitleClick = (id) => {
        setIsEditing(id);
    };

    const handleBlur = async (itemId, newTitle) => {
        let itemIndex = -1;
        
        const currentTodo = todo.find((item, index) => {
            if (item.id === itemId) {
                itemIndex = index;
                return true;
            }
            return false;
        });

        if (!currentTodo || itemIndex === -1) return; // Ensure the todo exists

        const updatedItem = { ...currentTodo, title: newTitle };
            
        // Update the state with the new item
        setList(prevTodos => {
            return [
                ...prevTodos.slice(0, itemIndex),
                updatedItem,
                ...prevTodos.slice(itemIndex + 1)
            ];
        });

        onUpdateTodo("title", newTitle, itemId).catch(error => {
            console.error("Failed to update the API:", error.message);
        });

        setIsEditing(false);
    };

    const handleDateChange = (itemId, date) => {
        
        let itemIndex = -1;
        
        const currentTodo = todo.find((item, index) => {
            if (item.id === itemId) {
                itemIndex = index;
                return true;
            }
            return false;
        });

        if (!currentTodo || itemIndex === -1) return; // Ensure the todo exists

        const updatedDate = date.toISOString().split('T')[0];
        const updatedItem = { ...currentTodo, completedBy: updatedDate };
            
        // Update the state with the new item
        setList(prevTodos => {
            return [
                ...prevTodos.slice(0, itemIndex),
                updatedItem,
                ...prevTodos.slice(itemIndex + 1)
            ];
        });

        onUpdateTodo("completedBy", updatedDate, itemId).catch(error => {
            console.error("Failed to update the API:", error.message);
        });
    }
    
    function handleCheckboxChange(itemId, setTodos, todos) {
        // Find the todo and its index in a single loop
        let itemIndex = -1;
        const currentTodo = todos.find((item, index) => {
            if (item.id === itemId) {
                itemIndex = index;
                return true;
            }
            return false;
        });
    
        if (!currentTodo || itemIndex === -1) return; // Ensure the todo exists
    
        const isChecked = !!currentTodo.completedAt;
        const updatedValue = isChecked ? null : new Date().toISOString().split('T')[0];
    
        // Create the updated item with either the reset value or current date
        const updatedItem = { ...currentTodo, completedAt: updatedValue };
    
        // Update the state with the new item
        setTodos(prevTodos => {
            return [
                ...prevTodos.slice(0, itemIndex),
                updatedItem,
                ...prevTodos.slice(itemIndex + 1)
            ];
        });

        // Update the API with the new data
        onUpdateTodo("completedAt", updatedValue, itemId).catch(error => {
            console.error("Failed to update the API:", error.message);
        });
    }
    
    function formatDateToMMDDYYYY(isoString) {
    
        if(!isoString) {
            return " ";
        }
    
        const date = new Date(isoString);
      
        const year = date.getFullYear();
      
        // add 1 to get the standard 1-12
        const month = String(date.getMonth() + 1).padStart(2, '0');
      
        const day = String(date.getDate()).padStart(2, '0');
      
        return `${month}-${day}-${year}`;
    }

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (isEditing && !event.target.closest(".editable-title")) {
                setIsEditing(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isEditing]);

    //map function to create list items from todoList array
    let listItem = todo.map(item => (
        <Li key={item.id} data-iscompleted={!!item.completedAt} >
            <CheckContainer>
                <input 
                    type="checkbox" 
                    checked={!!item.completedAt}
                    name={item.id}
                    onChange={() => handleCheckboxChange(item.id, setList, todo)}
                >
                </input>
            </CheckContainer>
            {isEditing === item.id ? (
                <ModifyTitleForm todo={item} onFinishEditing={(newTitle) => handleBlur(item.id, newTitle)} />
            ) : (
                <LiTitle data-iscompleted={!!item.completedAt} onClick={() => handleTitleClick(item.id)}>{item.title}</LiTitle>
            )}
            <LiCompletedAt>{formatDateToMMDDYYYY(item.completedAt)}</LiCompletedAt>
            <LiTitle>
                <MyDateComponent 
                    setCompleteDate={handleDateChange}
                    todoItem={item}
                >
                </MyDateComponent>
            </LiTitle>
            <LiButContain> 
                <Button className="remove--button" type = "button" onClick ={() => onRemoveTodo(item.id)}><DeleteIcon fontSize='small'/></Button>
            </LiButContain>
        </Li>
    ))

    return(
        <>
            {listItem}
        </>
    )
}