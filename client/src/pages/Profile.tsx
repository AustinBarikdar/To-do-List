import React, { useState } from 'react'
import { useContext } from 'react'
import { AppContent } from '../context/AppContext';
import { toast,ToastOptions } from 'react-toastify';

import axios from 'axios';


const Profile:React.FC = () => {
    const [EmailScreenShown,ChangeEmailScreen] = useState(false)
    const [EmailCode, ChangeEmailCode] = useState("")

    const context = useContext(AppContent);
    
    if (!context) {
        throw new Error("AppContent context is undefined");
    }

    
    const {backendURL,setIsLoggedin,setUserData,getUser} = context;

    const toastdata: ToastOptions<unknown> = {theme:'dark',position:'bottom-right',className:' bg-slate-100/5'}

    const EmailVerify = async() => {
        ChangeEmailScreen(true)
        const response = await axios.post(backendURL + '/api/auth/send-verify-otp',{},{withCredentials: true})
        
        if (!response.data.success){
            toast.error("Error",toastdata)
            localStorage.setItem('isLoggedin', 'false');
            localStorage.removeItem('userData');
            setIsLoggedin(false);
            setUserData(false);
        }

        toast.success("Sent code to email!",toastdata)
        
        
        console.log(response)
    };

    const CompleteEmailVerify = async() => {
        const response = await axios.post(backendURL + '/api/auth/verify-email',{otp:EmailCode},{withCredentials: true})
        
        if (response.data.success){
            getUser()
            toast.success("Verified!",toastdata)
            ChangeEmailScreen(false)
        }else{
            toast.error("Inccorect Code!",toastdata) 
        }

        

        console.log(response)
    };
    
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
                        <li >Email Verified: Not Verifed 
                            <button onClick={() => EmailVerify()} className='text-white text-sm border-1 rounded-md ring-1 px-1 py-0.5 w-40 mx-2  transition-all duration-300 ease-in-out hover:bg-white/50 drop-shadow-xl absolute'>Verify Email</button>
                        </li>
                        </>

                    }

                    {EmailScreenShown ? 
                        <>
                         <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-50'>
                             <div className='flex text-white text-sm border-1 rounded-md ring-1 px-4  bg-gray-800 transition-all duration-300 ease-in-out  drop-shadow-xl w-90 h-80 wd-40 flex-col justify-center'>
                                 <h2 className='flex justify-center py-5 font-bold' >Email Verification Screen</h2>
                                 <div className='flex justify-center text-center'>
                                    <p className='flex justify-center py-1 w-60' >Check your email for a one time code to verify your email.</p>
                                 </div>
                                
                                 <input 
                                     type="text" 
                                     placeholder="Enter verification code" 
                                     className="mt-2 w-full px-2  text-White rounded-md border-1 ring-1 flex justify-center py-2 my-5"
                                     onChange={(e) => ChangeEmailCode(e.target.value)}
                                 />
                                 <button  onClick={() => CompleteEmailVerify()} className='mt-2 text-white text-sm border-1 rounded-md ring-1 px-2 py-1 transition-all duration-300 ease-in-out hover:bg-white/50'>
                                     Sumbit
                                 </button>
                             </div>
                         </div>
                        </>:
                        <>

                        </>

                    }   
                    
                
                </ul>
                
            </div>
        </div>
       
    </div>
  )
}

export default Profile