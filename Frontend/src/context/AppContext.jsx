
import { createContext,useEffect,useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import {toast} from 'react-toastify'

axios.defaults.withCredentials=true;


export const AppContext=createContext();

export  const AppContextProvider=(props)=>{
    const [user,setUser]=useState(null)
    const[showLogin,setShowLogin]=useState(false)
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [credit,setCredit]=useState(false)
    const navigate=useNavigate()


    const loadCredit=async()=>{
        try {
            const {data}=await axios.get(backendUrl+'/api/user/credits')
            if(data.success){
                setCredit(data.credit)
                setUser(data.user)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const generateImage=async(prompt)=>{
        try {
            const {data}=await axios.post(backendUrl+'/api/user/generate-image',{prompt})
            if (data.success){
                loadCredit()
                return data.image
            }
            else{
                toast.error(data.message)
                console.log(backendUrl)
                loadCredit()
                if (data.creditBalance===0){
                    navigate('/buy-credits')
                }

            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    
    const logout=async()=>{
        try {
           const {data}=await axios.post(backendUrl+'/api/user/logout')
        if(data.success){
            toast.success(data.success)
            setUser(null)
            navigate('/')
        }else{
            toast.error(data.message)
        } 
        } catch (error) {
            console.log(error.message)
        }
        
    }

    useEffect(()=>{
        loadCredit()
    },[])



    const value={
        user,setUser,
        showLogin,setShowLogin,
        backendUrl,
        credit,setCredit,
        navigate,
        loadCredit,
        logout,
        generateImage
        
    }



    return(
    <AppContext.Provider value={value}>
            {props.children}
    </AppContext.Provider>
    )
}
