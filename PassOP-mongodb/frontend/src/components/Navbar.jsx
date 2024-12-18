import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white w-full fixed top-0'>
        <div className="mycontainer flex justify-between 
    items-center px-4 py-5 h-14">

        <div className="logo font-bold text-2xl">
        <span className='text-green-500'>&lt;</span>
            
        <span>Pass</span><span className='text-green-500'>OP/&gt;</span>
            
        </div>

        <ul>
            <li className='flex gap-4'>
                <a className='hover:font-bold' href="/">Home</a>
                <a className='hover:font-bold' href="/about">About</a>
                <a className='hover:font-bold' href="/contact">Contact</a>
            </li>
        </ul>
        <div>
          <button className='text-white bg-green-500 my-5 rounded-full flex justify-between items-center'>

          <img className='invert p-1 w-10' src="/icons/github.svg" alt="github" />
          <span className='font px-2'>Github</span>
          </button>
        </div>
        </div>
    </nav>
  )
}

export default Navbar
