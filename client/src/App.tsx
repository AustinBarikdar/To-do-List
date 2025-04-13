import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import ResetPassword from "./pages/ResetPassword"
import NavBar from "./components/NavBar"
import BottomBar from "./components/BottomBar"
import { ToastContainer } from 'react-toastify';
import Profile from "./pages/Profile"
import ProtectedRoute from "./components/ProtectedRoutes"
import Dashboard from "./pages/Dashboard"

const App = () => {
  
  return (
    <div >
      <NavBar/>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/reset-password' element = {<ResetPassword/>} /> 
          <Route path='/Profile'  element = {<ProtectedRoute type="/Login" beLogged = {true}  > <Profile/> </ProtectedRoute>} />
          <Route path='/Login' element = {<ProtectedRoute type="/" beLogged = {false} > <Login/> </ProtectedRoute>} />
          <Route path='/Dashboard' element = { <ProtectedRoute type="/Login" beLogged = {true} > <Dashboard/> </ProtectedRoute>} />
      </Routes>  
      <ToastContainer/>
      <BottomBar/>
    </div>
  )
}

export default App