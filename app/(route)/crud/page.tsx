'use client';
import React, { useState, useMemo, useEffect } from 'react';
import CrudForm from './CrudForm';
import { CiEdit } from 'react-icons/ci';

interface Todo {
  id: number;
  title: string;
  category?: string;
  isCompleted: boolean;
}

const todoData: Todo[] = [
  {
    id: 1,
    title: 'Eat Breakfast',
    category: 'Food',
    isCompleted: true,
  },
  {
    id: 2,
    title: 'Coding',
    category: 'Work',
    isCompleted: false,
  },
  {
    id: 3,
    title: 'Running',
    category: 'Sports',
    isCompleted: false,
  },
];

const Crud = () => {
  const [formPopup, setFormPopup] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>(todoData);
  const [editable, setEditable] = useState<string>('');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);

  useEffect(() => {

    if (searchQuery.trim() === '') {
      setFilteredTodos(todos);
    }
    const timer = setTimeout(() => {
      const query = searchQuery.toLowerCase().trim();
      console.log(query)
      setFilteredTodos(todos.filter((todo) => todo.title.toLowerCase().includes(query) || todo.category?.toLowerCase().includes(query)));
    }, 500);

    return ()=>clearTimeout(timer)
  }, [todos, searchQuery]);

  const addData = ({ title, category, isCompleted }: Omit<Todo, 'id'>) => {
    const newTodo = {
      id: Date.now(),
      title,
      category,
      isCompleted,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleCheckBox = (todo: Todo) => {
    setTodos((prevTodos) => prevTodos.map((prevTodo) => (prevTodo.id === todo.id ? { ...prevTodo, isCompleted: !prevTodo.isCompleted } : prevTodo)));
  };

  const deleteTodo = (todo: Todo) => {
    setTodos((prevTodos) => prevTodos.filter((prevTodo) => prevTodo.id !== todo.id));
  };

  const updateTitle = (e: React.ChangeEvent<HTMLInputElement>, todo: Todo) => {
    const value = e.target.value;
    setTodos((prevTodos) => prevTodos.map((prevTodo) => (prevTodo.id === todo.id ? { ...prevTodo, title: value } : prevTodo)));
  };

  return (
    <div className='p-5'>
      {formPopup && <CrudForm formClose={() => setFormPopup(false)} addData={addData} />}

      <div className='bg-gray-50 rounded-lg p-4 mb-6'>
        <div className='flex gap-4 items-center'>
          <div className='relative flex-1'>
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type='text' placeholder='Search todos by title or category...' className='border text-black border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition pr-10' />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'>
                ✕
              </button>
            )}
          </div>

          <button onClick={() => setFormPopup(true)} className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition'>
            Add Todo
          </button>
        </div>

        {searchQuery && (
          <div className='mt-3 text-sm text-gray-600'>
            Showing {filteredTodos.length} of {todos.length} todos matching `{searchQuery}`
          </div>
        )}
      </div>

      <div className='max-w-md mx-auto mt-8 bg-white rounded-lg shadow-md p-6'>
        {filteredTodos.length === 0 ? (
          <div className='text-center text-gray-500 py-8'>
            {searchQuery ? (
              <div>
                <p>No todos found matching `{searchQuery}`</p>
                <button onClick={() => setSearchQuery('')} className='text-blue-600 hover:text-blue-800 mt-2 underline'>
                  Clear search
                </button>
              </div>
            ) : (
              'No todos found. Add one to get started!'
            )}
          </div>
        ) : (
          filteredTodos.map((todo, index) => (
            <div key={todo.id} className='flex items-center justify-between py-3 border-b last:border-b-0'>
              <div className='flex items-center gap-3'>
                <span className='text-gray-400'>{index + 1}.</span>
                <div className='flex flex-col'>
                  <div className='flex items-center gap-2'>
                    {editable === todo.id.toString() ? (
                      <input type='text' className='text-black border-b border-black focus:outline-none' value={todo.title} onChange={(e) => updateTitle(e, todo)} onBlur={() => setEditable('')} autoFocus />
                    ) : (
                      <span className={`text-lg cursor-pointer ${todo.isCompleted ? 'line-through text-gray-400' : 'text-gray-800'}`} onClick={() => setEditable(todo.id.toString())}>
                        {todo.title}
                      </span>
                    )}
                    {editable !== todo.id.toString() && <CiEdit onClick={() => setEditable(todo.id.toString())} className='text-black cursor-pointer hover:text-blue-600' />}
                  </div>
                  {todo.category && <span className='text-xs text-gray-500 mt-1'>Category: {todo.category}</span>}
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <input onClick={() => toggleCheckBox(todo)} type='checkbox' checked={todo.isCompleted} readOnly className='accent-blue-500 w-5 h-5' />
                <button onClick={() => deleteTodo(todo)} className='bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded transition'>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Crud;
