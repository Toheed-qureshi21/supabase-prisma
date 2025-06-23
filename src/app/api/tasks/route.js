import { supabase } from "@/libs/supbaseClient";
import { NextResponse } from "next/server"

export const GET = async (req) => {

        const { data, error } = await supabase.from("todo").select("*").order('created_at',{ascending:false});
        if (error) {
            return NextResponse.json({error:error.message},{status:500});
        }
        return NextResponse.json({data},{status:200});
    
}
export const POST = async (req) => {
    const {title,description} = await req.json()
    if (!title || !description) {
        return NextResponse.json({message:"All fields required"},{status:400})
    }
    const {data,error} = await supabase.from("todo").insert([{title,description}]).select().single()
    if (error) {
        return NextResponse.json({error:error.message},{status:500});
    }
    return NextResponse.json({data,message:"Task created successfully"},{status:201});
}