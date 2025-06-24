'use client';

import { setUser } from "@/libs/redux/slices/user.slice";
import { store } from "@/libs/redux/store";
import { supabase } from "@/libs/supbaseClient";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";

export default function ReduxProvider({children}){

    const router = useRouter();
    useEffect(()=>{
        const {data: authListner} = supabase.auth.onAuthStateChange(async(event,session)=>{
        console.log("Auth event:", event)

      if (event === "SIGNED_IN" && session) {
        const { data: userData, error } = await supabase.auth.getUser()
        console.log(userData,"from redux ");
        
         setTimeout(()=>{
           router.push("/")
        },0)
      }

      if (event === "SIGNED_OUT") {
        // Redirect to login
       
        router.push("/login")
      }
     
            
        });
        return ()=> authListner.subscription.unsubscribe();
    },[])
        return (
            <Provider store={store}>
                {children}
            </Provider>
        )
}