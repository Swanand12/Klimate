import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className=' flex py-4  px-[2rem] bg-black '>
        <Link to="/"><img className='h-14 ' src='../src/assets/logo-2.png' alt='logo'/></Link>
    </header>
  )
}

export default Header