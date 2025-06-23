import { supabase, supabaseAdmin } from "@/libs/supbaseClient";
import { NextResponse } from "next/server";

// api route --> /signup
export const POST = async (req) => {
  try {
    const { email, password, user_name } = await req.json();
    if (!email || !password || !user_name) {
      return NextResponse.json(
        { message: "All fields are required " },
        { status: 400 }
      );
    }
    const { data: userData, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.log("signup error ");

      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    const auth_id = userData?.user?.id;
    console.log("auth id",auth_id);
    
    if (!auth_id) {
    
      
      return NextResponse.json(
        { error: "Signup failed: No user ID returned" },
        { status: 500 }
      );
    }
    
    const { error: insertingError } = await supabaseAdmin.from("users").insert({
      id:auth_id,
      user_name,
    });
    if (insertingError) {
      console.log(insertingError)
      return NextResponse.json(
        { error: insertingError.message },
        { status: 500 }
      );
    }


    return NextResponse.json(
      { userData, message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(error.message);
  }
};
