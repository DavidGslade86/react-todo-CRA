import React from "react"
import styled from 'styled-components'

export default function InputWithLabel ({todoTitle, handleTitleChange, isFocused}) {
    
    const Input = styled.input `
        background-color: rgb(249, 212, 212);
        appearance: none;
        border: none;
        outline: none;
        border-bottom: .2em solid #E91E63;
        border-radius: .2em .2em 0 0;
        padding: .4em;
        color: #453b3f;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 600;
        width: 50%;
        max-width: 200px;
    `;

    const inputRef = React.useRef();

    React.useEffect(() => {
        if(isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFocused])

    return(
        <>
            <Input  
                id="todoTitle" 
                name="title"
                defaultValue='New Todo'
                value = {todoTitle}
                onChange = {handleTitleChange}
                ref={inputRef}
            >
            </Input>
        </>
    )
}