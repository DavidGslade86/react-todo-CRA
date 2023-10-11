import React from "react"
import styled from 'styled-components'
import PropType from 'prop-types';

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
width: 80%;
max-width: 200px;
`;

InputWithLabel.propTypes = {
    todoTitle: PropType.string.isRequired,
    handleTitleChange: PropType.func.isRequired,
    handleKeyPress: PropType.func,
    handleBlur: PropType.func,
    isFocused: PropType.bool
}

export default function InputWithLabel ({todoTitle, handleTitleChange, isFocused, handleUpdate}) {

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
                className="editable-title"
                value={todoTitle}
                onChange={handleTitleChange}
                onBlur={handleUpdate ? () => handleUpdate(todoTitle) : null}
                onKeyDown={handleUpdate ? (event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        handleUpdate(todoTitle);
                    }
                } : null}
                ref={inputRef}
            >
            </Input>
        </>
    )
}