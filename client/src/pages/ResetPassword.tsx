import axios from 'axios';
import React, { useContext } from 'react'
import { toast,ToastOptions } from 'react-toastify';
import { AppContent } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const ResetPassword:React.FC = () => {
    const [email,setEmail] = React.useState("");
    const [otp,setOtp] = React.useState("");
    const [password,setPassword] = React.useState("");
    const [password2,setPassword2] = React.useState("");
    const [stage,setStage] = React.useState(1);

    const navigate = useNavigate();

    const context = useContext(AppContent);
        
    if (!context) {
        throw new Error("AppContent context is undefined");
    }

    const {backendURL} = context;
    const toastdata: ToastOptions<unknown> = {theme:'dark',position:'bottom-right',className:' bg-slate-100/5'}

    const onOTPSumbit = async() => {
        const res = await axios.get(backendURL + '/api/auth/check-passwordotp',{params: {
            email:email,
            otp:otp}})

       
        console.log(res.data)
        res.data.success? setStage(3) :toast.error("OTP Wrong",toastdata)
       
        
    }

    const sendPassowrdOTP = async() => {
        const res = await axios.post(backendURL + '/api/auth/send-password-otp', {"email":email})
        console.log(res.data)
        
        toast.success("Sent Code",toastdata)
    }

    const changePassword = async() => {
        const res = await axios.post(backendURL + '/api/auth/reset-password', {"email":email,otp:otp,password:password});
        console.log(res.data);
        
        res.data.success ? toast.success(res.data.message,toastdata) : toast.error(res.data.message,toastdata) ;
        navigate("/");
    }
  return (
    <>
    <div className='mt-auto min-h-screen  ' >
        <div className='flex justify-center flex-col py-10 mt-auto'>
            <div className='flex justify-center'>
                <h1 className='text-white font-bold text-2xl shadow-2xl '>Reset Password</h1>
            </div>
            <div className='flex justify-center py-5 px-5'>
                <ul className='flex flex-col font-bold py-3 px-10 text-white ring-2 w-full md:w-lg rounded border-white-1/10 bg-slate-100/5 '>

                <form className=' flex flex-col text-white ' onSubmit={(event) => event.preventDefault()} >
                    
                {
                    (stage == 1)
                    ?
                    <>
                    <label className='flex justify-center text-xl ' >Email</label><br/>
                    <p className='flex justify-center text-l text-white/50 text-center' >Type in your email so we can send you a code to use to reset your password!</p><br/>
                    <input type = "email"  onChange={(e) => setEmail(e.target.value)}  placeholder='Email' className = "ring-2 rounded shadow-xl py-1 px-4 m-3" ></input><br/>
                    <div className='flex justify-center py-5'><br/>
                        <input type="submit" value={"Sumbit"} onClick={() => {if(stage == 1){sendPassowrdOTP();setStage(2)}}} className = "ring-2 rounded-full shadow-xl py-1 px-8 hover:px-10 transition-all " ></input>
                    </div>
                    </>
                    :null

                }
                {
                    (stage == 2)
                    ?
                    <>
                    <label className='flex justify-center text-xl ' >Enter OTP</label><br/>
                    <p className='flex justify-center text-l text-white/50 text-center' >Enter the One time Password sent to the email!</p><br/>
                    <input type = "text"  onChange={(e) => setOtp(e.target.value)}  placeholder='Code' className = "ring-2 rounded shadow-xl py-1 px-4 m-3" ></input><br/>
                    <div className='flex justify-center py-5'><br/>
                        <input type="submit" value={"Sumbit"}  onClick = {() => { if (otp.length == 6){onOTPSumbit()}}} className = "ring-2 rounded-full shadow-xl py-1 px-8 hover:px-10 transition-all " ></input>
                    </div>
                    </>
                    :null
                }
                {
                    (stage == 3)
                    ?
                    <>
                    <label className='flex justify-center text-xl ' >Change your Password!</label><br/>
                    <p className='flex justify-center text-l text-white/50 text-center' >Set a New password! Must be over 6 characters.</p><br/>
                    <input type = "password"  onChange={(e) => setPassword(e.target.value)}  placeholder='New Password' className = "ring-2 rounded shadow-xl py-1 px-4 m-3" ></input><br/>
                    <input type = "password"  onChange={(e) => setPassword2(e.target.value)} placeholder='Repeat Password' className = "ring-2 rounded shadow-xl py-1 px-4 m-3" ></input><br/>
                    <div className='flex justify-center py-5'><br/>
                        <input type="submit" value={"submit"} onClick={() =>{if(password == password2 && password.length >= 6){
                            changePassword()
                        }else{
                            toast.error("Password length is either to short, or password doesn't match",toastdata)
                        }
                        }} className = "ring-2 rounded-full shadow-xl py-1 px-8 hover:px-10 transition-all " ></input>
                    </div>
                    </>

                    :null
                }
                
                </form>
                
                </ul>
            </div>
        </div>
       
    </div>
        
   </>
  )
}

export default ResetPassword