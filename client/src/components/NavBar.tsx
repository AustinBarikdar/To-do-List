import React from 'react'

const NavBar:React.FC = () => {
  return (
    <nav className = "bg-slate-800 p-4 drop-shadow-xl md:flex md:items-align md:justify-between">
        

            <div className='px-2 mx-2 my-0 md:my-0' >
                <a href='/' className='text-white border-1  py-1 border-none rounded-md text font-bold text-2xl underline drop-shadow-xl'  > StayOrganized </a>
            </div>

            <ul className = "md:flex md:items-algin md:justify-start z-[-1] md:auto text-lg">
                <li className='mx-2 my-6 md:my-0'>
                    <a href='/' className='text-white border-1 px-3 py-1 border-none rounded-md text hover:bg-sky-900 transition-all duration-300 ease-in-out drop-shadow-xl'> About </a>
                </li>
                <li className='mx-5 my-1  md:my-0 '>
                    <button className = "  text-white text-xl border-1 rounded-md ring-1 px-5 py-0.5  transition-all duration-300 ease-in-out hover:bg-slate-900/50 drop-shadow-xl relative">Login</button>
                </li>


            </ul>

            
        
       

    </nav>

  )
}

export default NavBar