"use client";
import NebulaLoader from "@/app/components/Loading";
import { useAuth } from "@/context/userContext";
import { useRouter } from 'next/navigation'
import React, {useEffect} from 'react'

function page() {

      const router = useRouter()
        const {user, status} = useAuth()

      useEffect(()=>{
            function checkAuth(){
                  
                  if (status === "pending"){
                    return (
                      <NebulaLoader />
                    )
                  }
                  
                  if(user ){
                    
                      router.push("/message")
                    }

                    if(!user || status === "not authenticated"){
                      router.push("/login")

                    }

            }

            checkAuth()
      }, [])
      



}

export default page