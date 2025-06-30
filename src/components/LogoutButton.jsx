'use client'
import { supabaseAdmin } from "@/libs/supbaseClient";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";

export default function LogoutButton (){
     const handleLogout = async() => {
    await supabaseAdmin.auth.signOut();
    
    toast.success("Logout successfully")
  }
    return (
        <button onClick={handleLogout} className="flex gap-2">Logout <LogOut/></button>
    )
}