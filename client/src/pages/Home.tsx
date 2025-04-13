import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';

const Home:React.FC = () => {
    const navigate = useNavigate();

    const context = useContext(AppContent);
    if (!context) {
        throw new Error("AppContent context is undefined");
    }
    
    const { isLoggedin } = context;

    function OnTryClick(){
       isLoggedin ? navigate("/") :navigate("/Login")
    };

  return (
    <div className=' bg-gradient-to-b from-gray-800 to-gray-800 mt-auto min-h-screen ' >
        <div className='flex justify-center flex-col py-10 mt-auto' >
            <div className='flex justify-center py-10 '>
                <h1 className='text-[60px] font-bold text-white bg-slate-100/5 p-2 rounded-lg shadow-lg px-4 ' > Welcome!</h1>
            </div>
       
            <div className='flex justify-center '>
                <div className=" flex size-10 animate-bounce rounded-full shadow-2xl bg-white p-2 ring-sky-900/5 dark:bg-gray-700"><svg className="size-6 text-white" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg></div>
            </div>
            <div className='flex justify-center py-5'>
                <h1 className='font-bold py-3 px-10 text-white shadow-2xl sm:w-md md:w-lg rounded border-white-1/10 bg-slate-100/5 '>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h1>
            </div>
            <div className = 'flex justify-center py-5 my-1' >
                <button  onClick={OnTryClick} className = 'font-bold py-3 px-10 shadow-2xl text-white transition-all duration-300  sm:w-50  md:w-50 rounded-full bg-blue-500 hover:my-1'>
                    Try now!
                </button>
            </div>

        </div>
    </div>   

    
  )
}

export default Home 