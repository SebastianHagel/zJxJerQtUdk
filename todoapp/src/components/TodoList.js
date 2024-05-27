import React, { useState, useEffect } from 'react'
import Todo from './Todo'

const TodoList = () => {  
  const [opencount, setCountOpenTodos] = useState(0);
  const [todos, setTodos] = useState(() => {
      const storedTodos = JSON.parse(localStorage.getItem('todos'));
      return storedTodos || [];
  });
  const [textInput, setTextInput] = useState("");

  const changeText = (e) => {
    setTextInput(e.target.value);
  }
  
  const submit = (e) => {
    e.preventDefault();
    if (textInput) {
      const newTodos = [...todos];
      const newTodo = {"description": textInput, "done": false}
      newTodos.push(newTodo);
      console.log(newTodos);
      setTodos(newTodos);
      setTextInput('');
    }
    else {
      console.log("empty input");
    }
  }

  const changeTodo = (index) => {
    const newTodos = [...todos];
    if (newTodos[index].done) {
      newTodos[index].done = false;
    }
    else {
      newTodos[index].done = true;
    }

    setTodos(newTodos);
  }

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    if (newTodos[index] && newTodos[index].done) {
      newTodos.splice(index,1);
    }
    else {
      alert('TODO: ' + newTodos[index].description + ' is not done yet');
    }
    setTodos(newTodos);
  }

  const countOpen = () => {
    const donetodos = todos.filter((todo) => {
        return !todo.done;
    })

    setCountOpenTodos(donetodos.length);
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    countOpen();
  }, [todos]);

  return (
    <div className="shadow-sm hover:shadow-lg">
      <div className="text-center bg-gray-900 text-white text-3xl py-4 font-semibold">
        <h1 className="text-xl">Unsere Todos</h1>
        <h2>Offene todos: {opencount}</h2>
        <form className="grid grid-cols-3 py-2">
          <input 
            type="text" 
            value={textInput}
            placeholder='...neues Todo' 
            className="col-span-2 py-2 text-gray-900"
            onChange={changeText}
          ></input>
          <input 
            type="submit" 
            value="Add Todo" 
            className="col-span-1 bg-gray-400 cursor-pointer"
            onClick={submit}
          ></input>
        </form>
      </div>
      {todos.map((item, index) => {
        return <Todo 
          key={index} 
          description={item.description} 
          done={item.done}
          onChangeTodo={changeTodo}
          onDeleteTodo={deleteTodo}
          index={index}
        ></Todo>;
      })}
    </div>
  )
}

export default TodoList