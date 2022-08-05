import React from 'react'
import './input.css'
import {FiSearch} from 'react-icons/fi'

function Input({text, submit, func}) {
  return (
    <form className='input' onSubmit={submit}>
        <input type={"text"} placeholder="enter location" className='input-value' onChange={text}/>
        <span className='input-icon' onClick={func}>
            <FiSearch/>
        </span>
    </form>
  )
}

export default Input