import React from "react"

export default function InputWithLabel ({todoTitle, handleTitleChange, label, isFocused}) {
    
    const inputRef = React.useRef();

    React.useEffect(() => {
        if(isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFocused])

    return(
        <>
            <label className="side--marg bold" htmlFor="todoTitle">{label}</label>
            <input 
                className="side--marg" 
                id="todoTitle" 
                name="title"
                value = {todoTitle}
                onChange = {handleTitleChange}
                ref={inputRef}
            >
            </input>
        </>
    )
}