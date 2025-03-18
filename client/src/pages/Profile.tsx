import React from 'react'
import { useContext } from 'react'
import { AppContent } from '../context/AppContext';


const Profile:React.FC = () => {

    const context = useContext(AppContent);
    if (!context) {
        throw new Error("AppContent context is undefined");
    }
    
    const { userData } = context;
  return (
    <div className='mt-auto min-h-screen  ' >
        <div className='flex justify-center flex-col py-10 mt-auto'>
            <div className='flex justify-center'>
                <h1 className='text-white font-bold text-2xl shadow-2xl '>Profile</h1>
            </div>
            <div className='flex justify-center py-5 px-5'>
                <ul className='flex flex-col font-bold py-3 px-10 text-white ring-2 w-full md:w-lg rounded border-white-1/10 bg-slate-100/5 '>
                    <li >Name: {userData.name}</li>
                    {  
                        userData.isAccountVerified?
                        <>
                        <li >Email Verified:Verified</li>
                        </> :
                        <>
                        <li >Email Verified: Not Verifed <button className='text-white text-sm border-1 rounded-md ring-1 px-1 py-0.5 w-40 mx-2  transition-all duration-300 ease-in-out hover:bg-white/50 drop-shadow-xl absolute'>Verify Email</button></li>
                        
                        </>

                    }
                    
                
                </ul>
                
            </div>
        </div>
       
    </div>
  )
}

export default Profile