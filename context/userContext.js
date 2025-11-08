"use client"
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://172.23.123.249:7116/api'





export const Authcontext = createContext()

export const AuthProvider = ({children})=> {
      const [user, setUser] = useState(null)
     
      const [status, setStatus] = useState(null)
      const [error, setError] = useState("")

useEffect(()=>{

  const getUser = async () => {
    
    try { 
      setStatus("pending")
      
      const res = await axios.get("/auth/user")
      setUser(res.data)
      setStatus("sucess")
    } catch (error) {
      setUser(null)
      setError(error)
      setStatus("not authenticated")
      
    }
  }

  getUser()
  
},[])
      

      const register = async (name, email, password)=>{

          try {
            setStatus("pending")
            const res = await axios.post('/auth/register',
               {name:name, email:email, password:password}, {withCredentials:true})
            setUser(res.data)
            setStatus("success")

          } catch (error) {
            setStatus(error)
            setError(error)

          }

      }

      const login = ()=>{

      }


const value = {user, status, register, error}

return (
  <Authcontext.Provider value={value}>
    {children}
  </Authcontext.Provider>
)

}

export const useAuth = ()=> useContext(Authcontext)