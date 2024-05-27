import React, { useState } from 'react'

const Todo = ({description, done, onChangeTodo, onDeleteTodo, index}) => {
  return (
    <div>
      <div className={
        done ? "flex justify-between items-center p-2 bg-green-600 text-white"
        : "flex justify-between items-center p-2 bg-red-500 text-white"
      }>
        <h1 
          className="text-lg cursor-pointer" 
          onClick={() => {
            onChangeTodo(index);
          }}
          >
          {description}
        </h1>
        
        <button 
          className="text-lg bg-gray-400 p2 text-white p-2" 
          onClick={() => {
            onDeleteTodo(index);
          }}
        >{done ? "Löschen" : "not done"}</button>
      </div>
    </div>
  )
}

export default Todo