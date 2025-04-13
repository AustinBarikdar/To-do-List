import axios from 'axios';
import React, { useContext } from 'react'
import { AppContent } from '../context/AppContext';
import { toast, ToastOptions } from 'react-toastify';

const Dashboard:React.FC = () => {
    const toastdata: ToastOptions<unknown> = {theme:'dark',position:'bottom-right',className:' bg-slate-100/5'}
    const [date,setDate] = React.useState("");
    const [title,setTitle] = React.useState("");
    const [description,setDescription] = React.useState(" ");


    const context = useContext(AppContent);
    
    if (!context) {
        throw new Error("AppContent context is undefined");
    }

    const {backendURL } = context;

    const createTask = async() => {

        if (!title || !date){
            toast.error("The Date and Title is required to be filled",toastdata)
        }

        const {data} = await axios.post(backendURL + "/api/task/create-task",{
            "title":title,
            "description":description,
            "date":date
        },{withCredentials: true});

        if (data.success){
            toast.success("Succesfully created new task",toastdata)
        }else{
            toast.error(data.message,toastdata)
        }
        
    }

  return (
    <div className='mt-auto min-h-screen  ' >
         <div className='text-center py-5 mt-auto text-white mx-1 text-2xl font-bold'>
                <h1>Dashboard</h1>
         </div>

        <div className='lg:flex justify-between lg:pb-20 mt-auto text-white mx-1 h-125 '>
            <div className='w-full ring-2 ring-white px-1 py-1 rounded shadow-2xl justify-center flex-col flex lg:w-full '>
                <h1 className='font-bold text-center'>Create New Task</h1>
                <h6 className='font-bold text-center text-white/50 text-sm'>Make a new task to add to a your to do list.</h6>
                <div className='flex justify-center flex-col m-5'>
                    <label className='font-bold text-m text-center'>Title</label>
                    <input type='Text' onChange={(e) => { setTitle(e.target.value)}} className = "ring-2 rounded shadow-xl py-1 px-2 my-5 " placeholder='Title'/>
                    <label className='font-bold text-m text-center'>Description</label>
                    <input type='Text' onChange={(e) => { setDescription(e.target.value)}} className = "ring-2 rounded shadow-xl py-1 px-2 my-5 " placeholder='Description'/>  
                    <label className='font-bold text-m text-center'>Time Due</label>
                    <div className='flex justify-center '>
                        <input type="datetime-local" id="due date" onChange = {(e) => {setDate(new Date(e.target.value).toUTCString()); console.log(new Date(e.target.value).toUTCString()); console.log(new Date(new Date(e.target.value).toUTCString()))}} name="due-date" className = "text-black ring-2 rounded py-1 px-2 my-5 w-55 invert" />
                        
                    </div> 
                    <div className='flex justify-center '>
                        <input type="button" onClick={createTask} className= "border-white ring-2 rounded-md px-5 hover:bg-white/50" value={"Create"}/>
                    </div> 
                </div>

            </div>
            <div className='border-black/70 border-y-2  my-5 border-r-2 w-full rounded-r-lg justify-center flex invisible sm:invisible md:invisible lg:visible h-sm invert'>
                <ul className='w-full m-2 overflow-auto p-5'>
                    <li className='rounded-sm ring-2 p-5 w-full text-black my-4  '>
                        <h1 id="Topic" className="text-black text-lg">Homework 1</h1>
                        <h1 id="Description" className="text-black/60 text-md text-wrap w-sm"> Homework is due soon Homework </h1>
                    </li>
                           
                    
                </ul>
            </div>
        </div> 
            <div className='border-black/70  border-y-2 border-2 w-full  rounded justify-center flex sm:visible md:visible lg:invisible h-90 invert'>
                <ul className='w-full m-2 overflow-auto p-5'>
                    
                </ul>
            </div>   
    </div>           

  )
}

export default Dashboard