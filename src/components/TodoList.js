import React from "react";
import TodoListItems from "./TodoListItems";
import PropType from 'prop-types';

export default function TodoList (props) {
    const {todoList, onRemoveTodo} = props

    TodoList.propTypes = {
        todoList: PropType.array.isRequired,
        onRemoveTodo: PropType.func.isRequired,
    }

    return(
        <>
            <ul className="todo--list">
                <TodoListItems 
                    todo = {todoList} 
                    onRemoveTodo = {onRemoveTodo}
                />
            </ul>
        </>
    )
}