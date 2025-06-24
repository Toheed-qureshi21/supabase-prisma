import { supabase, supabaseAdmin } from "@/libs/supbaseClient";
import { NextResponse } from "next/server";

export const GET = async (req,{params}) => {
        const {userId} = await params;
        
        const { data, error } = await supabaseAdmin.from("todo").select("*").eq("user_id",userId).order('created_at',{ascending:false});
        if (error) {
            return NextResponse.json({error:error.message},{status:500});
        }
        return NextResponse.json({data},{status:200});
    
}