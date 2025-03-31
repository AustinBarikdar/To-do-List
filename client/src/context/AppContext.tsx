import axios from "axios";
import { createContext,useState, useEffect } from "react";
import cookie from "js-cookie"
interface MyContextProps {
    getUser: () => Promise<void>
    backendURL: any,
    isLoggedin: boolean,
    setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>,
    userData: any,
    setUserData: React.Dispatch<React.SetStateAction<boolean>>,
  }

export const AppContent = createContext <MyContextProps | undefined>(undefined);

export const AppContextProvider = (props: any) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [isLoggedin,setIsLoggedin] = useState(localStorage.getItem('isLoggedin') == 'true');
    const [userData,setUserData] = useState(JSON.parse(localStorage.getItem('userData') || 'null'));

    useEffect(() => {
        if (isLoggedin){
            checkToken();
        }
        
    }, [isLoggedin]);

    const getUser = async() => {
        const response = await axios.get(backendURL + "/api/user/data",{withCredentials:true})

        try{
            if (response.data.success){
                console.log(response.data)
                setUserData(response.data.userInfo)
                localStorage.setItem('userData', JSON.stringify(response.data.userInfo));
                setIsLoggedin(true)
                localStorage.setItem('isLoggedin', "true");
            }else
            {
                console.log(response.data)
            }
        }catch(error){
            console.error(error)
        }
    }

    const checkToken = async() => {

        const response = await axios.get(backendURL + "/api/auth/check-token",{withCredentials:true})

        try{
            if (response.data.success == false){
                localStorage.setItem('isLoggedin', 'false');
                localStorage.removeItem('userData');
                setIsLoggedin(false);
                setUserData(false);
                cookie.remove('token', {path: '/'});
            }else{
                console.log(response.data)
            }
        }catch(error){
            console.error(error)
        }
    }

    const value = {
        getUser,
        backendURL,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
    }

    return(
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}