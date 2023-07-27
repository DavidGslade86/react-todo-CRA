import React from "react"
import TodoListItems from "./TodoListItems"

export default function TodoList (props) {
    const {todoList, onRemoveTodo} = props

    return(
        <>
            <ul>
                <TodoListItems 
                    todo = {todoList} 
                    onRemoveTodo = {onRemoveTodo}
                />
            </ul>
        </>
    )
}