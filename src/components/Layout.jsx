import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <div className='bg-[#111111] '>
    <Header/>
    <main className='min-h-[100vh] w-[100%]   px-[2rem]'>{children}</main>
    <Footer/>
    </div>
  )
}

export default Layout