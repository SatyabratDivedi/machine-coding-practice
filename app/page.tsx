'use client'
import Link from 'next/link';
import React from 'react'

interface Project {
  name: string;
  link: string;
}

const App = () => {

  const projects: Project[] = [
    {
      name: 'Stepper',
      link: '/stepper',
    },
    {
      name: 'Pagination and Popup',
      link: '/pagination-and-popup',
    },
    {
      name: 'CRUD Operations',
      link: '/crud',
    },
    {
      name: 'tabs with state persist',
      link: '/tabs',
    },
    {
      name: 'Edit and Update with Todo data',
      link: '/todos',
    },
    {
      name: 'infinite scroll',
      link: '/infinite-scroll',
    },
  ]
  return (
    <div>
      <h1>Project List</h1>
      <ul>
        {projects.map((project, index) => (
          <div key={index}>
            <span className='mr-2'>{index + 1}.</span>
            <Link href={project.link}>{project.name}</Link>
          </div>
        ))}
      </ul>

    </div>
  )
}

export default App