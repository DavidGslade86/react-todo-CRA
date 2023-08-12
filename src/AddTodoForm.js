import React from "react"
export default function AddTodoForm () {

    return(
        <>
            <form>
                <label className="side--marg bold" htmlFor="todoTitle">Title</label>
                <input className="side--marg" id="todoTitle"></input>
                <button className="side--marg">ADD</button>
            </form>
        </>
    )
}