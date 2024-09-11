import React, { useState } from 'react'
import { useTodo } from '../contexts/todos-context';

const TodoFrom = () => {
  
  const [todo, setTodo] = useState('');
  const {addTodo} = useTodo();

  const formSubmitHandler = e => {
    e.preventDefault();
    if(todo.length > 0){
      todo.trim();
      addTodo(todo);
      setTodo('');
    }    
  }

  return (
    <form  className="flex" onSubmit={formSubmitHandler}>
    <input
        type="text"
        placeholder="Write Todo..."
        onChange={e => setTodo(e.target.value)}
        value={todo}
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
    />
    <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
        Add
    </button>
</form>
  )
}

export default TodoFrom