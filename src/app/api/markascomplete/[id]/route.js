import { supabaseAdmin } from "@/libs/supbaseClient";
import { NextResponse } from "next/server";

export const PATCH = async(req,{params}) => {
  try {
    const {id} = await params;
    const {data,error} = await supabaseAdmin.from("todo").update({isCompleted:true}).eq("id",id).select();
    console.log(data);
   
    
    if (error) {
      console.error(error);
  return NextResponse.json({ error: error.message }, { status: 400 });
    }

      return NextResponse.json({data,message:"Mark as completed successfully" }, { status: 200});

  } catch (error) {
    console.error(error);
      return NextResponse.json({ error: error.message }, { status: 400 });
  }
}