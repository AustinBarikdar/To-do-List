import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { AppContent } from '../context/AppContext';
import { toast, ToastOptions } from 'react-toastify';

const Dashboard: React.FC = () => {
    const toastdata: ToastOptions<unknown> = { theme: 'dark', position: 'bottom-right', className: 'bg-slate-100/5' };
    const [date, setDate] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [checkbox, setCheckbox] = React.useState(false);

    const context = useContext(AppContent);

    if (!context) {
        throw new Error("AppContent context is undefined");
    }

    const { backendURL,setdoList,doList } = context; 

    useEffect(() => {
        if (!doList) {
            const fetchTasks = async () => {
                const { data } = await axios.get(backendURL + "/api/task/get-tasks", { withCredentials: true });
                if (data.success) {
                    setdoList(data.data);
                    localStorage.setItem('doList', JSON.stringify(data.data));
                } else {
                    toast.error(data.message, toastdata);
                }
            }
            fetchTasks();    

        }
    },[doList])

    

    const createTask = async () => {
        if (!title || !date) {
            toast.error("The Date and Title is required to be filled", toastdata);
            return;
        }
        let desc = description || " ";

        const { data } = await axios.post(backendURL + "/api/task/create-task", {
            "title": title,
            "description": desc,
            "date": date
        }, { withCredentials: true });

        console.log(data);
        if (data.success) {
            toast.success("Successfully created new task", toastdata);
            setdoList(doList.concat(data.data));
            localStorage.setItem('doList', JSON.stringify(doList.concat(data.data)));
            setTitle("");
            setDescription("");
            
        } else {
            toast.error(data.message, toastdata);
        }
    }
    const deleteTask = async (taskId: string, index : number) => {
        const { data } = await axios.delete(backendURL + "/api/task/delete-task/" + taskId, {
            withCredentials: true
        });

        if (data.success) {
            toast.success("Successfully deleted task", toastdata);
            const updatedList = doList.filter((task: any, i: number) => i !== index);
            setdoList(updatedList);
            localStorage.setItem('doList', JSON.stringify(updatedList));
        } else {
            toast.error(data.message, toastdata);
        }
    }

    const completedTask = async (index: number ,taskId: string, Value: boolean) => {
        const { data } = await axios.put(backendURL + "/api/task/update-task/" + taskId, {
            completed: Value
        }, { withCredentials: true });

        if (data.success) {
            toast.success("Successfully updated task", toastdata);
            const updatedList = [...doList];
            updatedList[index].completed = Value;
            setdoList(updatedList);
            localStorage.setItem('doList', JSON.stringify(updatedList));
        } else {
            toast.error(data.message, toastdata);
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white'>
            <div className='text-center py-10'>
                <h1 className='text-4xl font-bold'>Dashboard</h1>
                <p className='text-gray-400 mt-2'>Manage your tasks efficiently</p>
            </div>

            <div className='lg:flex justify-between lg:pb-20 px-5'>
                <div className='w-full lg:w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg'>
                    <h2 className='text-2xl font-semibold text-center'>Create New Task</h2>
                    <p className='text-center text-gray-400 text-sm mb-6'>Add a new task to your to-do list</p>
                    <div className='space-y-4'>
                        <div>
                            <label className='block font-medium'>Title</label>
                            <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className='w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500' placeholder='Enter task title' />
                        </div>
                        <div>
                            <label className='block font-medium'>Description</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500' placeholder='Enter task description'></textarea>
                        </div>
                        <div>
                            <label className='block font-medium'>Time Due</label>
                            <input type="datetime-local" onChange={(e) => setDate(new Date(e.target.value).toUTCString())} className='w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500' />
                        </div>
                        <div className='text-center'>
                            <button onClick={createTask} className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'>Create Task</button>
                        </div>
                    </div>
                </div>

                {/* Task List Section */}
                <div className='w-full lg:w-1/2 mt-10 lg:mt-0 lg:ml-10 bg-gray-800 p-6 rounded-lg shadow-lg'>
                    <h2 className='text-2xl font-semibold text-center'>Your Tasks</h2>
                    <p className='text-center text-gray-400 text-sm mb-6'>View and manage your tasks</p>
                    <ul className='space-y-4 overflow-auto max-h-96 scheme-dark bg-transparent px-5 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800'>
                        {   
                            doList.length === 0 ?
                                <li className=' p-4 rounded-lg shadow text-center'>No tasks available</li>
                            :
                            doList && doList.map((task: any, index: number) => (
                                <li key={index} className='bg-gray-700 p-4 px-5 rounded-lg shadow'>
                                    <div className='flex justify-between items-center '>
                                        <h3 className='text-lg font-bold'>{task.title}</h3>
                                        <button value={"delete"} onClick={() => deleteTask(task._id, index)} className='bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded mt-2'>Delete</button>
                                    </div>
                                    <p className='text-gray-400 text-sm'>{task.description}</p>
                                    <div className='flex justify-between items-center mt-2'>
                                        <span className='text-gray-400 text-sm'>Due at: {new Date(task.date).toLocaleString()}</span>
                                        <div className='flex items-center'>
                                            <label className='mr-2'>Completed</label>
                                            <input type="checkbox" checked={task.completed} onChange={(e) => completedTask(index ,task._id, e.target.checked)} className="accent-blue-500" 
                                            />
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;