import { supabaseAdmin } from "@/libs/supbaseClient";
import { NextResponse } from "next/server";

export const GET = async() => {
  try {
    const {data} = await supabaseAdmin.auth.getUser();
    console.log("user profile in backend ",data);
    return NextResponse.json(data);
    
  } catch (error) {
    console.log(error);
    
  }
}
