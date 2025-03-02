import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import EmailVerify from "./pages/EmailVerify"
import ResetPassword from "./pages/ResetPassword"
import NavBar from "./components/NavBar"
import BottomBar from "./components/BottomBar"

const App = () => {
  return (
    <div >
      <NavBar/>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/login' element = {<Login/>} />
        <Route path='/email-verfiy' element = {<EmailVerify/>} />
        <Route path='/reset-password' element = {<ResetPassword/>} />
      </Routes>
      <BottomBar/>
    </div>
  )
}

export default App