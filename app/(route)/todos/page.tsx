'use client'
import { useEffect, useState } from 'react';

interface todoType {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default function Todos() {
  const [todos, setTodos] = useState<todoType[]>([]);
  const [editingTodoId, setEditingTodoId] = useState<null | number>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [filteredId, setFilteredId] = useState(1);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
      const data = await res.json();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  const checkBoxHandler = (todo: todoType) => {
    setTodos((prevTodos) => {
      return prevTodos.map((prevTodo) => {
        if (prevTodo.id !== todo.id) return prevTodo;
        return { ...prevTodo, completed: !prevTodo.completed };
      });
    });
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const editTitle = (todo: todoType) => {
    setEditValue(todo.title);
    setEditingTodoId(todo.id);
  };

  const updateTodo = (id: number) => {
    setTodos((prevTodos) => {
      return prevTodos.map((prevTodo) => {
        if (prevTodo.id !== id) return prevTodo;
        return {
          ...prevTodo,
          title: editValue,
        };
      });
    });

    setEditingTodoId(null);
  };

  const uniqueUserId = (todos: todoType[]): number[] => {
    return Array.from(new Set(todos.map((todo) => todo.userId)));
  };

  return (
    <div className='text-black'>
        <div className='text-white'>This is not pagination this is userId, and per userId have 20 todo.</div>
      <div className='text-white'>
        User: 
        {uniqueUserId(todos).map((id) => {
          return (
            <button className={`border border-white px-2 text-white ${filteredId == id && 'bg-blue-600'}`} key={id} onClick={() => setFilteredId(id)}>
              {id}
            </button>
          );
        })}
      </div>
      <div className='text-start'>
        {todos
          .filter((todo) => todo.userId == filteredId)
          .map((todo) => {
            return (
              <div key={todo.id} className='bg-gray-100 m-1 p-1 flex justify-between'>
                <div style={{ display: 'flex' }}>
                  {todo.id}.{editingTodoId == todo.id ? <input type='text' className='outline-2' value={editValue} onChange={(e) => setEditValue(e.target.value)} name='' id='' /> : <div>{todo.title}</div>}
                  <input onChange={() => checkBoxHandler(todo)} type='checkbox' checked={todo.completed} />
                </div>
                <div style={{ display: 'flex', gap: '5px' }}>
                  {editingTodoId == todo.id ? (
                    <div>
                      <button className='border cursor-pointer rounded px-2' onClick={() => setEditingTodoId(null)}>Cancel</button>
                      <button className='border cursor-pointer rounded px-2' onClick={() => updateTodo(todo.id)}>Update</button>
                    </div>
                  ) : (
                    <button className='border cursor-pointer rounded px-2' onClick={() => editTitle(todo)}>Edit</button>
                  )}

                  <button className='border cursor-pointer rounded px-2' style={{ background: 'red' }} onClick={() => deleteTodo(todo.id)}>
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
