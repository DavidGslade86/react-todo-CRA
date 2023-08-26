import React from "react"
import TodoListItems from "./TodoListItems"

export default function TodoList (props) {
    const {todoList, onRemoveTodo} = props

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