import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='home-container flex flex-col items-center mt-24 h-screen'>
      <h1 className='text-4xl font-bold mb-4'>Welcome to the Meeting App</h1>
      <p className='text-lg text-gray-700'>Manage your meetings efficiently and stay organized.</p>
      <div className='button-group flex space-x-4 mt-8'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          <Link to="/important-meetings">Important Meetings</Link>
        </button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          <Link to="/add-meeting">Add New Meeting</Link>
        </button>
      </div>
    </div>
  )
}

export default Home