import React from 'react'
import Main from '../components/Main'
import NavBar from '../components/NavBar'

function Landing () {
  return (
    <div className='min-h-screen'>
      <div className='sticky top-0 delayed fadeIn'>
        <NavBar />
      </div>
      <div className='slideIn'>
        <Main />
      </div>
    </div>
  )
}

export default Landing
