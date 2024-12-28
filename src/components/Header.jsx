import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SearchCity from './SearchCity'
import { Button } from './ui/button'
import { IoMdArrowRoundBack } from "react-icons/io";
import logo from "../assets/logo-2.svg"

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <header className={`flex justify-between items-center py-4  px-[5rem] bg-black `}>
        <Link to="/"><img className='h-14 ' src={logo} alt='logo'/></Link>
        {location.pathname === "/" ? <SearchCity/> : <button onClick={()=>navigate("/")} className='text-white bg-black p-2 rounded-lg border border-gray-500'><IoMdArrowRoundBack strokeWidth={1} size={25}/></button>}
    </header>
  )
}

export default Header