import { cookieConfigFn } from "@/constants/constant";
import { supabase, supabaseAdmin } from "@/libs/supbaseClient";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// api route --> /signup
export const POST = async (req) => {
  try {
    const { email, password, user_name } = await req.json();
    const cookieStore = await cookies();
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
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    // userData.session.access_token
    const access_token = userData?.session?.access_token;
    const refresh_token = userData?.session?.refresh_token;
    const auth_id = userData?.user?.id;
    
    cookieStore.set("access_token", access_token,cookieConfigFn(60*60));
    cookieStore.set("refresh_token", refresh_token,cookieConfigFn(15*24*60*60));

    const { error: insertingError } = await supabaseAdmin.from("users").insert({
      id: auth_id,
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
      { user:userData.user, message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(error.message);
  }
};
