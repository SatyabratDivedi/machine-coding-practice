'use client'
import Link from 'next/link';
import React, { useState } from 'react'

interface Project {
  name: string;
  link: string;
}

const App = () => {
  const data: Project[] = [
    {
      name: 'Stepper',
      link: '/stepper',
    },
  ]

  const [projects, setProjects] = useState<Project[]>(data);
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