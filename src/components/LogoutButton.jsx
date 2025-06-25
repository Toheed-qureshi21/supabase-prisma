'use client'
import { supabaseAdmin } from "@/libs/supbaseClient";
import toast from "react-hot-toast";

export default function LogoutButton (){
     const handleLogout = async() => {
    await supabaseAdmin.auth.signOut();
    toast.success("Logout successfully")
  }
    return (
        <button onClick={handleLogout}>Logout</button>
    )
}