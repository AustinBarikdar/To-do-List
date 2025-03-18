import axios from 'axios';
import React, { useContext } from 'react'

import { toast,ToastOptions } from 'react-toastify';
import { AppContent } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Login:React.FC = () => {
    const navigate = useNavigate();

    const context = useContext(AppContent);
    if (!context) {
        throw new Error("AppContent context is undefined");
    }
    
    const {getUser, backendURL, setIsLoggedin } = context;

    

    const toastdata: ToastOptions<unknown> = {theme:'dark',position:'bottom-right',className:' bg-slate-100/5'}

    const [loginForm,setLoginForm] = React.useState(true)
    const [currentName,setName] = React.useState("");
    const [email,setEmail] = React.useState("");
    const [password,setPassword] = React.useState("");



    async function Register(){
        try{
            const response = await axios.post( backendURL + '/api/auth/register',{
                "name":currentName,
                "email": email,
                "password": password},{withCredentials: true})
            
            console.log(response.data)
            
            if (response.data.success) {
                toast.success("Successfully created account",toastdata)
                getUser()
             
            }else{
                toast.error(response.data.message,toastdata)
            } 
                
                
            return response.data.success

        }catch(error){
            throw error
        }
    }
    async function Login(){
        try{
            const response = await axios.post(backendURL +'/api/auth/login',{
                "email": email,
                "password": password},{withCredentials: true})
            
            console.log(response.data)
            
            if (response.data.success){
                toast.success("Successfully Signed in",toastdata)
                getUser()
                navigate("/");
             }else{
                toast.error(response.data.message,toastdata)
            }
            
            return response.data.success
            

        }catch(error){
            throw error
        }
    }

    const onSumbitFunction = (event:React.FormEvent<HTMLFormElement>) => {
        
        if (password.length < 6 || password.includes(" ")) {
            toast.error("Password is too short, must be above 6 characters or has a space",{theme:'dark',position:'bottom-right',className:' bg-slate-100/5'})
            event.preventDefault();
            return
        }
        
        if (loginForm) {
            Login()
            event.preventDefault();
        }else{
            Register()
            event.preventDefault();
        }

        
        
          
    }

  return (
    <div className='mt-auto min-h-screen '>
         <div className='flex justify-center flex-col py-10 mt-auto' >
            <div className='flex justify-center py-10 '>
                
                <h1 className='text-[40px] font-bold text-white ring-2 rounded shadow-xl bg-slate-100/5 px-4 '  >{loginForm ? 'Login' : 'Register'}</h1>
         </div> 
        <div className='flex justify-center' >
            <div className=' w-100 flex flex-col text-white py-10 font-bold ring-2 rounded shadow-xl bg-slate-100/5 px-4 ' >
                {loginForm ? 
                <form className=' flex flex-col text-white ' onSubmit={onSumbitFunction} >
                    <label>Email</label><br/>
                    <input type = "email"  onChange={(e) => setEmail(e.target.value)}  value={email} className = "ring-2 rounded shadow-xl py-1 px-1" ></input><br/>
                    <label>Password</label><br/>
                    <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} className = "ring-2 rounded shadow-xl py-1 px-1" ></input><br/>
                    <div className='flex justify-center'><br/>
                        <input type="submit" value={"Login"} className = "ring-2 rounded-full shadow-xl py-1 px-8 hover:px-10 transition-all " ></input>
                    </div>
                </form>

                :<form className=' flex flex-col text-white ' onSubmit={onSumbitFunction}  >
                    <label>Name</label><br/>
                    <input type = "text"  onChange={(e) => setName(e.target.value)} value={currentName} className = "ring-2 rounded shadow-xl py-1 px-1" ></input><br/>
                    <label>Email</label><br/>
                    <input type = "email"  onChange={(e) => setEmail(e.target.value)} value={email} className = "ring-2 rounded shadow-xl py-1 px-1" ></input><br/>
                    <label>Password</label><br/>
                    <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} className = "ring-2 rounded shadow-xl py-1 px-1" ></input><br/>
                    <div className='flex justify-center'><br/>
                        <input type="submit" value={loginForm ? "Login" : "Register"} className = "ring-2 rounded-full shadow-xl py-1 px-8 hover:px-10 transition-all " ></input>
                    </div>
                </form>}
                <br/>
                <button className='text-white/40 hover:text-white' onClick={ () => {setLoginForm(!loginForm)}}  > {loginForm ? "Don't have a account? Register!" : "Already have a account? Login!"} </button>
            </div>
           
        </div>
       
            
        


        </div>
        
    </div>
  )
}

export default Login