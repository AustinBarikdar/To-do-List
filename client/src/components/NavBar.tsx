import React, { useContext, useEffect } from 'react'
import { AppContent } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const NavBar:React.FC = () => {
    const navigate = useNavigate();

    const context = useContext(AppContent);
    if (!context) {
        throw new Error("AppContent context is undefined");
    }   
    
    const {getUser, isLoggedin, userData} = context;

    useEffect(() => {
        if (!isLoggedin){
            getUser();
        } else {
            localStorage.setItem('isLoggedin', 'true');
        }
    }, [isLoggedin]);
   
  return (
    <nav className = "bg-slate-800 p-4 drop-shadow-xl md:flex md:items-align md:justify-between">
        
            <div className='px-2 mx-2 my-0 md:my-0' >
                <button onClick= {() => {navigate("/")}} className='text-white border-1  py-1 border-none rounded-md text font-bold text-2xl underline drop-shadow-xl hover:text-white/80'  > StayOrganized </button>
            </div>

            <ul className = "md:flex md:items-algin md:justify-start z-[-1] md:auto text-lg">
                <li className='mx-2 my-6 md:my-0'>
                    <button onClick= {() => {navigate("/")}} className='text-white border-1 px-3 py-1 border-none rounded-md text hover:bg-sky-900 transition-all duration-300 ease-in-out drop-shadow-xl'> About </button>
                </li>
                {
                    isLoggedin ? 
                    <>
                    <li className='mx-5 my-1 hidden md:my-0 group md:block '>
                    <button onClick= {() => {navigate("/profile")}} className = "text-white flex size-10 rounded-full bg-white py-1.5 px-3.5 ring-1 ring-sky-900/5 dark:bg-white/5 dark:ring-white/100 hover:bg-white/10 z-20" >{userData.name[0]}</button>
                        <div className='md:group-hover:block hidden absolute bg-slate-800 text-white mt-2 rounded-md shadow-lg top-12 right-0 z-10'>
                            <button className="block px-5 py-2 text-12 hover:text-white/50">Profile</button>
                            <button className="block px-5 py-2 text-12 hover:text-white/50">Log Out</button>
                        </div>
                    </li>

                    <li className='mx-2 my-6  md:my-0 md:hidden'>
                        <button onClick= {() => {navigate("/")}} className='text-white border-1 px-3 py-1 border-none rounded-md text hover:bg-sky-900 transition-all duration-300 ease-in-out drop-shadow-xl'> Profile </button>
                    </li>
                    <li className='mx-2 my-6  md:my-0  md:hidden'>
                        <button onClick= {() => {navigate("/")}} className='text-white border-1 px-3 py-1 border-none rounded-md text hover:bg-sky-900 transition-all duration-300 ease-in-out drop-shadow-xl'> Log Out </button>
                    </li>
                    </> 
                    :
                    <li className='mx-5 my-1  md:my-0 '>
                    <button onClick= {() => {navigate("/login")}} className = "  text-white text-xl border-1 rounded-md ring-1 px-5 py-0.5  transition-all duration-300 ease-in-out hover:bg-slate-900/50 drop-shadow-xl relative">Login</button>
                    </li>
                }
                

            </ul>
    </nav>
  )
}

export default NavBar