import { supabase, supabaseAdmin } from "@/libs/supbaseClient";
import { NextResponse } from "next/server"


export const POST = async (req) => {
    const {title,description,userId} = await req.json()
    console.log("userid in post ",userId);
    
    
    if (!title || !description) {
        return NextResponse.json({message:"All fields required"},{status:400})
    }
    const {data,error} = await supabaseAdmin.from("todo").insert([{title,description,user_id:userId}]).select().single()
    if (error) {
        return NextResponse.json({error:error.message},{status:500});
    }
    return NextResponse.json({data,message:"Task created successfully"},{status:201});
}