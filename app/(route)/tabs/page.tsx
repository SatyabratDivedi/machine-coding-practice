'use client';
import { useState } from 'react';
import { toast } from 'sonner';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState<string>('About');
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number | undefined>();
  const [hobby, setHobby] = useState<string>('');

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8'>
      <div className='max-w-2xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>User Information Form</h1>
          <p className='text-gray-600'>Please fill out your details step by step</p>
        </div>

        {/* Tab Navigation */}
        <div className='flex bg-white rounded-lg shadow-sm p-1 mb-6'>
          <div onClick={() => setActiveTab('About')} className={`flex-1 text-center py-3 px-6 rounded-md cursor-pointer transition-all duration-200 font-medium ${activeTab === 'About' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'}`}>
            <div className='flex items-center justify-center gap-2'>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${activeTab === 'About' ? 'bg-white text-blue-500' : 'bg-gray-200'}`}>1</span>
              About
            </div>
          </div>
          <div onClick={() => setActiveTab('Hobby')} className={`flex-1 text-center py-3 px-6 rounded-md cursor-pointer transition-all duration-200 font-medium ${activeTab === 'Hobby' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'}`}>
            <div className='flex items-center justify-center gap-2'>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${activeTab === 'Hobby' ? 'bg-white text-blue-500' : 'bg-gray-200'}`}>2</span>
              Hobby
            </div>
          </div>
          <div onClick={() => setActiveTab('Submit')} className={`flex-1 text-center py-3 px-6 rounded-md cursor-pointer transition-all duration-200 font-medium ${activeTab === 'Submit' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'}`}>
            <div className='flex items-center justify-center gap-2'>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${activeTab === 'Submit' ? 'bg-white text-blue-500' : 'bg-gray-200'}`}>3</span>
              Submit
            </div>
          </div>
        </div>
        {activeTab === 'About' ? (
          <div className='space-y-6'>
            <div className='text-center mb-8'>
              <h2 className='text-2xl font-semibold text-gray-800 mb-2'>Personal Information</h2>
              <p className='text-gray-600'>Tell us about yourself</p>
            </div>

            <div className='space-y-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Full Name <span className='text-red-500'>*</span>
                </label>
                <input onChange={(e) => setName(e.target.value)} value={name} type='text' className='w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none' placeholder='Enter your full name' />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Age <span className='text-red-500'>*</span>
                </label>
                <input onChange={(e) => setAge(Number(e.target.value))} value={age || ''} type='number' min='1' max='120' className='w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none' placeholder='Enter your age' />
              </div>
            </div>

            <div className='flex justify-between pt-6'>
              <button disabled className='px-6 py-3 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed'>
                Previous
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (name === '' || age === undefined || age <= 0) {
                    return alert('Please fill all required details');
                  }
                  setActiveTab('Hobby');
                }}
                className='px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg'
              >
                Next Step →
              </button>
            </div>
          </div>
        ) : activeTab === 'Hobby' ? (
          <div className='space-y-6'>
            <div className='text-center mb-8'>
              <h2 className='text-2xl font-semibold text-gray-800 mb-2'>Your Interests</h2>
              <p className='text-gray-600'>What do you enjoy doing?</p>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Favorite Hobby <span className='text-red-500'>*</span>
              </label>
              <input onChange={(e) => setHobby(e.target.value)} value={hobby} type='text' className='w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none' placeholder='e.g., Reading, Gaming, Sports, Music...' />
              <p className='text-sm text-gray-500 mt-2'>Tell us about something you're passionate about</p>
            </div>

            <div className='flex justify-between pt-6'>
              <button onClick={() => setActiveTab('About')} className='px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors duration-200'>
                ← Previous
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (hobby === '') {
                    return alert('Please enter your hobby');
                  }
                  setActiveTab('Submit');
                }}
                className='px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg'
              >
                Next Step →
              </button>
            </div>
          </div>
        ) : (
          <div className='space-y-6'>
            <div className='text-center mb-8'>
              <h2 className='text-2xl font-semibold text-gray-800 mb-2'>Review & Submit</h2>
              <p className='text-gray-600'>Please review your information before submitting</p>
            </div>

            {/* Summary Card */}
            <div className='bg-gray-50 rounded-lg p-6 space-y-4'>
              <h3 className='text-lg font-medium text-gray-800 mb-4'>Your Information:</h3>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='bg-white p-4 rounded-lg'>
                  <span className='text-sm text-gray-500'>Name</span>
                  <p className='font-medium text-gray-800'>{name || 'not provided'}</p>
                </div>

                <div className='bg-white p-4 rounded-lg'>
                  <span className='text-sm text-gray-500'>Age</span>
                  <p className='font-medium text-gray-800'>{age || 'not provided'}</p>
                </div>

                <div className='bg-white p-4 rounded-lg md:col-span-2'>
                  <span className='text-sm text-gray-500'>Hobby</span>
                  <p className='font-medium text-gray-800'>{hobby || 'not provided'}</p>
                </div>
              </div>
            </div>

            <div className='flex justify-between pt-6'>
              <button onClick={() => setActiveTab('Hobby')} className='px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors duration-200'>
                ← Previous
              </button>
              <button
                onClick={() => {
                  if (name == '' || age == undefined || hobby == '') {
                    return toast.error('all details important');
                  }
                  console.log({ name, age, hobby });
                  toast.success('Information submitted successfully!');
                }}
                className={`px-8 py-3 ${name == '' || age == undefined || hobby == '' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg flex items-center gap-2`}
              >
                <svg className='w-5 h-5' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                </svg>
                Submit Information
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
