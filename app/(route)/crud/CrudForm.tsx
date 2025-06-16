'use client';
import React, { useState } from 'react';

interface todoType {
  title: string;
  category: string;
  isCompleted: boolean;
}

interface FormInterface {
  formClose: () => void;
  addData: (todo: todoType) => void;
}

const CrudForm = ({ formClose, addData }: FormInterface) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title == '' || category == '') return alert('all details is important');

    addData({ title, category, isCompleted });
    formClose();
  };

  return (
    <div className='h-full z-10 w-full fixed inset-0 flex items-center justify-center text-black bg-black/60 backdrop-blur-[1px]'>
      <div className='crud-form border w-[60%] p-6 bg-white rounded-lg shadow-md'>
        <h2 className='text-xl font-semibold mb-4'>Add Task</h2>
        <form onSubmit={(e) => submitForm(e)} className='space-y-4'>
          <div className='flex flex-col'>
            <label htmlFor='title' className='mb-1 font-medium'>
              Title <span className='text-red-500'>*</span>
            </label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} type='text' id='title' className='border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter task title' />
          </div>

          <div className='flex flex-col'>
            <label htmlFor='category' className='mb-1 font-medium'>
              Choose Category<span className='text-red-500'>*</span>
            </label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} id='category' className='border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
              <option value='' className='not-allowed cursor-not-allowed opacity-50'>
                Select a category
              </option>
              <option value='food'>Food</option>
              <option value='study'>Study</option>
              <option value='sport'>Sport</option>
            </select>
          </div>

          <div className='flex items-center justify-between'>
            <label htmlFor='isCompleted' className='font-medium'>
              Is It Completed <span className='text-red-500'>*</span>
            </label>
            <div className='flex items-center gap-3 '>
              <button onClick={() => setIsCompleted(true)} type='button' className={`border cursor-pointer rounded px-2 ${isCompleted && 'bg-blue-500 text-white'}`}>
                Yes
              </button>
              <button onClick={() => setIsCompleted(false)} type='button' className={`border cursor-pointer rounded px-2 ${!isCompleted && 'bg-red-500 text-white'}`}>
                No
              </button>
            </div>
          </div>

          <div className='flex justify-end space-x-2 pt-4'>
            <button onClick={formClose} type='button' className='px-4 py-2 border rounded-md hover:bg-gray-100'>
              Cancel
            </button>
            <button type='submit' className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrudForm;
