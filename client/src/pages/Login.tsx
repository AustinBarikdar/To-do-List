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
    
    const {getUser, backendURL } = context;

    

    const toastdata: ToastOptions<unknown> = {theme:'dark',position:'bottom-right',className:' bg-slate-100/5'}

    const [loginForm,setLoginForm] = React.useState(true)
    const [currentName,setName] = React.useState("");
    const [email,setEmail] = React.useState("");
    const [password,setPassword] = React.useState("");



    async function Register(){
        try{
            const response = await axios.post( backendURL + '/api/auth/register',{
                "name":currentName,
                "email": email.toLowerCase(),
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
                "email": email.toLowerCase(),
                "password": password},{withCredentials: true})
            
            console.log(response.data)
            
            if (response.data.success){
                toast.success("Successfully Signed in",toastdata)
                getUser()
                navigate("/");
             }else{
                toast.error("Invalid Password or Email",toastdata)
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
    <div className=' bg-gradient-to-b from-gray-800 to-gray-800 mt-auto min-h-screen '>
        <div className='flex justify-center flex-col py-30 mt-auto' >
            <div className='flex justify-center' >
                <div className=' w-100 flex flex-col text-white py-10 font-bold  rounded shadow-xl bg-slate-100/5 px-4 mx-2 ' >
                    <h1 className='text-[40px] y-10  font-bold text-white text-center'>{loginForm ? 'Login' : 'Register'}</h1>
                    <h1 className='text-[12px] font-bold text-white/80 text-center'>{loginForm ? 'Log in to access your to do list!' : 'Sign up and join the community!'}</h1>
                {loginForm ? 
                 <>
                    <form className=' flex flex-col text-white ' onSubmit={onSumbitFunction} >
                        <label className='py-2 mt-5 text-sm'>Email</label>
                        <input type = "email"  onChange={(e) => setEmail(e.target.value)}  value={email} className = "border-1 border-slate-400 rounded shadow-xl py-1 px-1" ></input><br/>
                        <label className='py-2 text-sm' >Password</label>
                        <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} className = "border-1 border-slate-400 rounded shadow-xl py-1 px-1" ></input><br/>
                        <div className='flex justify-center py-5'>
                            <input type="submit" value={"Login"} className = " rounded-full shadow-xl py-2 bg-blue-500 px-8 duration-300 hover:bg-blue-500/80 transition-all " ></input>
                        </div>
                    </form>
                    <button className='text-sm text-white/40 hover:text-white py-3' onClick={ () => {navigate("/reset-password")}}  > Forgot Passowrd? </button>
                </>
                :<form className=' flex flex-col text-white ' onSubmit={onSumbitFunction}  >
                    <label className='py-2 mt-5 text-sm'>Name</label>
                    <input type = "text"  onChange={(e) => setName(e.target.value)} value={currentName} className = "border-1 border-slate-400 rounded shadow-xl py-1 px-1" ></input>
                    <label className='py-2 mt-5 text-sm' >Email</label>
                    <input type = "email"  onChange={(e) => setEmail(e.target.value)} value={email} className = "border-1 border-slate-400 rounded shadow-xl py-1 px-1" ></input>
                    <label className='py-2 mt-5 text-sm'>Password</label>
                    <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} className = "border-1 border-slate-400 rounded shadow-xl py-1 px-1" ></input>
                    <div className='flex justify-center py-5'><br/>
                        <input type="submit" value={loginForm ? "Login" : "Register"} className = " rounded-full shadow-xl py-2 bg-blue-500 px-8 duration-300 hover:bg-blue-500/80 transition-all  " ></input>
                    </div>
                </form>}
                <br/>
                <button className='text-sm text-white/40 hover:text-white' onClick={ () => {setLoginForm(!loginForm)}}  > {loginForm ? "Don't have a account? Register!" : "Already have a account? Login!"} </button>
            </div>
           
        </div>
       
            
        


        </div>
        
    </div>
  )
}

export default Login