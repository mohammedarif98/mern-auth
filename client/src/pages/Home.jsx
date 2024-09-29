import React from 'react'
import { useSelector } from 'react-redux'


const Home = () => {

  const {currentUser} = useSelector((state)=>state.user) 

  return (
    <div className='flex justify-center mt-96'>
      <p className='text-2xl font-bold text-slate-950 uppercase'>
        {currentUser && currentUser.username ? `Welcome, ${currentUser.username}` : 'Welcome to Home Page'}
      </p>
    </div>
  )
}



export default Home
