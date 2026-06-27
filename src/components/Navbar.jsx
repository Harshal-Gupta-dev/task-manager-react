import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-slate-600 p-2 text-white">
        <div className="logo">
            <span className='text-xl font-bold' >iTask</span>
        </div>
     <ul className="flex gap-5">
        <li className='cursor-pointer  hover:font-bold transition-all' >Home</li>
        <li className='cursor-pointer  hover:font-bold transition-all' >Your Task</li>
     </ul>
    </nav>
  )
}

export default Navbar
