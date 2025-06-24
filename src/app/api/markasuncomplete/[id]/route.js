import { supabaseAdmin } from "@/libs/supbaseClient";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
  try {
    const { id } = await params;
    const { data, error } = supabaseAdmin.from("todo").update({ isCompleted: false }).eq("id", id).select();
    if (error) {
      return NextResponse.json({ error: error.message },{status:400});
    }

    console.log("mark as incomplete b ", data);
    return NextResponse.json({ data, message: "Mark as pending successfully" }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
