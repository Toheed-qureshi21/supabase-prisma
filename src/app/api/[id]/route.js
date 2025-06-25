import { supabase, supabaseAdmin } from "@/libs/supbaseClient";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  try {

    const { title, description } = await req.json();
    const { id } = await params
    const numericId = parseInt(id);
    const { data, error } = await supabaseAdmin.from("todo").update({
      title, description, isUpdated: true, updated_at: new Date().toISOString()
    }).eq("id", numericId).select();

    if (error) {
      console.error(error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Edited successfully ", data }, { status: 200 })
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

}

export const DELETE = async (req, { params }) => {
  try {
    const { id } = await params;
    const { data, error } = await supabaseAdmin.from("todo").delete().eq("id", id).select();
    console.log("deleted data ", data);

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: "Task deleted !" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}


