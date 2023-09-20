import React from "react";
import TodoListItems from "./TodoListItems";
import PropType from 'prop-types';
import styled from 'styled-components';

TodoList.propTypes = {
    todoList: PropType.array.isRequired,
    onRemoveTodo: PropType.func.isRequired,
    setList:PropType.func.isRequired,
}

export default function TodoList (props) {
    
const Sorter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 12px 12px 0 12px;
    padding: 10px;
    font-weight: 800;
    background-color: rgb(146, 120, 139);
    box-shadow: 2px 2px 6px 0px rgba(108,0,0,0.72);
    -webkit-box-shadow: 2px 2px 6px 0px rgba(108,0,0,0.72);
    -moz-box-shadow: 2px 2px 6px 0px rgba(108,0,0,0.72);
    width: 75%;
    color:rgb(31, 24, 30);
    transition: box-shadow .3s ease-out,-webkit-box-shadow .3s ease-out, -moz-box-shadow .3s ease-out;

    &:hover {
        box-shadow: 2px 2px 6px 0px rgba(255, 98, 0, 0.622);
        -webkit-box-shadow: 2px 2px 6px 0px rgba(255, 98, 0, 0.622);
        -moz-box-shadow: 2px 2px 6px 0px rgba(255, 98, 0, 0.622);
        transition: box-shadow .3s ease-out,-webkit-box-shadow .3s ease-out, -moz-box-shadow .3s ease-out;
    }

    @media (min-width: 800px) {
        width: 50%;
        margin-left: 100px;
    }

    @media (min-width: 1300px) {
        width: 35%;
        margin-left: auto;
        margin-right: auto;
    }
`;
    const {todoList, onRemoveTodo, setList} = props;

    const SortTitle = styled.span `
        width: 50%;
    `
    // boolean state to manage sort direction.
    const [isSortedAsc, setIsSortedAsc] = React.useState(false);

    const handleSort = () => {

        const sortedTodos = [...todoList];
        
        // Sort the copy based on the isSortedAsc state.
        sortedTodos.sort((a, b) => {
            if (isSortedAsc) {
                return a.title.localeCompare(b.title);
            } else {
                return b.title.localeCompare(a.title);
            }
        });
        setList(sortedTodos);
        
        // Flip the sorting direction.
        setIsSortedAsc(!isSortedAsc);
    };

    return (
        <>
            <ul className="todo--list">
                <Sorter onClick={handleSort}>
                    <SortTitle>TASKS</SortTitle>
                </Sorter>
                <TodoListItems 
                    todo={todoList} 
                    onRemoveTodo={onRemoveTodo}
                />
            </ul>
        </>
    );
}