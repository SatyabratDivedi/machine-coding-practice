'use client';
import Link from 'next/link';
import React from 'react';

const Navigation = () => {
  return (
    <div>
      <div>
        <nav className='bg-gray-800 p-4 text-white'>
          <Link href='/' className='text-xl font-bold cursor-pointer'>Machine Coding Practice</Link>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
