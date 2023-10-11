import React from "react"
import styles from './SideNavBar.module.css';
import styled from 'styled-components' 
import PropType from 'prop-types';

const Input = styled.input `
background-color: rgb(249, 212, 212);
appearance: none;
border: none;
outline: none;
width: 75%;
border-bottom: .2em solid #E91E63;
border-radius: .2em .2em 0 0;
padding: .4em;
color: #453b3f;
font-family: Arial, Helvetica, sans-serif;
font-weight: 600;
`;

InputNewList.propTypes = {
    ListTitle: PropType.string.isRequired,
    handleTitleChange: PropType.func.isRequired,
    isFocused: PropType.bool
}

export default function InputNewList ({ListTitle, handleTitleChange, isFocused}) {

    const inputRef = React.useRef();

    React.useEffect(() => {
        if(isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFocused])

    return(
        <div className={styles.column}>
            <Input
                id="listTitle" 
                name="title"
                value = {ListTitle}
                onChange = {handleTitleChange}
                ref={inputRef}
            />
        </div>
    )
}