import { useEffect, useState } from "react";
import { TodoProvider } from "./contexts/todos-context";
import TodoFrom from "./components/TodoFrom";
import TodoItem from "./components/TodoItem";

function App() {

  const [todos, setTodos] = useState([]);

  const addTodo = todo => {
    setTodos(prev => [{id: Date.now(), todo, completed: false}, ...prev]);
  }

  const updateTodo = (id, todo) => {
    setTodos(prev => prev.map(prevTodo => prevTodo.id === id ? {...prevTodo, todo} : prevTodo));
  }

  const deleteTodo = id => {
    setTodos(prev => prev.filter(prevTodo => prevTodo.id !== id));
  }

  const toggleCompleted = id => {
    setTodos(prev => prev.map(prevTodo => prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo))
  }

  useEffect(()=>{
    let localTodos = JSON.parse(localStorage.getItem('todos')) || [];

    if(localTodos.length > 0) setTodos(localTodos);    

  },[]);

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  console.log(todos);
  

  

  return (
    <TodoProvider value={{todos, addTodo, deleteTodo, updateTodo, toggleCompleted}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoFrom/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.length > 0 && todos.map(todo => <TodoItem todo={todo} key={todo.id} />)}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
