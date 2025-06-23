import { supabase } from "@/libs/supbaseClient";
import { NextResponse } from "next/server";

export const PUT = async(req,{params}) => {
    try {
        // const {searchParams} = new URL(req.url)
    const {title,description} = await req.json();

    // const id = searchParams.get("id");
    const {id} = await params
    const numericId = parseInt(id);
    const {data,error} = await supabase.from("todo").update({title,description}).eq("id",numericId).select();
    
    if (error) {
      console.error(error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({message:"Edited successfully ",data},{status:200})
    } catch (error) {
    console.error(error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    
}

export const DELETE = async(req,{params}) => {
    try {
        const {id} = await params;
        const {data,error} = await supabase.from("todo").delete().eq("id",id);
        if (error) {
          console.error(error);
      return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({message:"Task deleted !"});
    } catch (error) {
         console.error(error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export const PATCH = async(req,{params}) => {
  try {
    const {id} = await params;
    const {data,error} = await supabase.from("todo").update({isCompleted:true}).eq("id",id).select();
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
