import React from "react";
import TodoListItems from "./TodoListItems";
import PropType from 'prop-types';
import styled from 'styled-components';

TodoList.propTypes = {
    todoList: PropType.array.isRequired,
    onRemoveTodo: PropType.func.isRequired,
    onUpdateTodo:PropType.func.isRequired,
    setList:PropType.func.isRequired,
}

const Sorter = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 12px 12px 12px;
    padding: 10px;
    font-weight: 800;
    background-color: rgb(146, 120, 139);
    box-shadow: 2px 2px 6px 0px rgba(108,0,0,0.72);
    -webkit-box-shadow: 2px 2px 6px 0px rgba(108,0,0,0.72);
    -moz-box-shadow: 2px 2px 6px 0px rgba(108,0,0,0.72);
    width: 75%;
    min-width: 620px;
    color:rgb(31, 24, 30);
    transition: box-shadow .3s ease-out,-webkit-box-shadow .3s ease-out, -moz-box-shadow .3s ease-out;

    &:hover {
        box-shadow: 2px 2px 6px 0px rgba(255, 98, 0, 0.622);
        -webkit-box-shadow: 2px 2px 6px 0px rgba(255, 98, 0, 0.622);
        -moz-box-shadow: 2px 2px 6px 0px rgba(255, 98, 0, 0.622);
        transition: box-shadow .3s ease-out,-webkit-box-shadow .3s ease-out, -moz-box-shadow .3s ease-out;
    }

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

const SortTitle = styled.span `
box-sizing: border-box;
width: 20%;
margin-inline: 3px;
flex: 0 0 auto;
cursor: pointer;
justify-content:center;
text-align:center;
min-width: 120px;
`

export default function TodoList (props) {
    
    const {todoList, onRemoveTodo, setList, onUpdateTodo} = props;
    
    // state object for different categories.
    const [sortConfig, setSortConfig] = React.useState({ key: null, direction: 'asc' });

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
    
        setSortConfig({ key, direction });
    
        const sortedTodos = [...todoList];
    
        sortedTodos.sort((a, b) => {
            if (typeof a[key] === 'string') {
                return direction === 'asc' 
                    ? a[key].localeCompare(b[key])
                    : b[key].localeCompare(a[key]);
            } else if (typeof a[key] === 'number') {
                return direction === 'asc'
                    ? a[key] - b[key]
                    : b[key] - a[key];
            }
            return 0;
        });
    
        setList(sortedTodos);
    };

    return (
        <>
            <ul className="todo--list">
                <Sorter>
                    <SortTitle>COMPLETED?</SortTitle>
                    <SortTitle onClick={()=>handleSort("title")}>TASK</SortTitle>
                    <SortTitle onClick={()=>handleSort("completedAt")}>DATE COMPLETED</SortTitle>
                    <SortTitle onClick={()=>handleSort("completedBy")}>COMPLETE BY</SortTitle>
                    <SortTitle>DELETE</SortTitle>
                </Sorter>
                <TodoListItems 
                    todo={todoList} 
                    setList ={setList}
                    onRemoveTodo={onRemoveTodo}
                    onUpdateTodo={onUpdateTodo}
                />
            </ul>
        </>
    );
}