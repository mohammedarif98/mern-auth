import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className=' bg-gray-500'>
        <div className='flex justify-between items-center max-w-7xl mx-auto py-6'>
            <Link to='/'><h1 className='font-bold'>Auth App</h1></Link>
            <ul className='flex gap-6'>
                <Link to='/'><li>Home</li></Link>
                <Link to='/about'><li>About</li></Link>
                <Link to='/sign-in'><li>Login</li></Link> 
            </ul>
    </div>
    </div>
  )
}


export default Header