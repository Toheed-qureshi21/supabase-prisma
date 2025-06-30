import { cookieConfigFn } from "@/constants/constant";
import { supabase } from "@/libs/supbaseClient";
import { cookies } from "next/headers";
import { NextResponse } from "next/server"
import { prisma } from "../../../../../prisma/prismaClient";


export const POST = async (req) => {
    try {
        const { email, password,isRemember } = await req.json();
        console.log("is remember in login ",isRemember);
        
        if (!email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }
        const cookieStore = await cookies();
        const { data: userData, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        const access_token = userData?.session?.access_token;
        const refresh_token = userData?.session?.refresh_token;
        const auth_id = userData?.user?.id;

        const user = await prisma.user.findUnique({
            where:{
                id:auth_id
            }
        });
        console.log("user in login ",user);
        const accessTokenMaxAge = isRemember ? 15 * 24 * 60 * 60 : 60 * 60;
        cookieStore.set("access_token", access_token, cookieConfigFn(accessTokenMaxAge));
        cookieStore.set("refresh_token", refresh_token, cookieConfigFn(15 * 24 * 60 * 60));
        
        return NextResponse.json(
            { user, message: "User Logged in successfully" },
            { status: 201 }
        );

    } catch (error) {
        console.log(error.message);
        return NextResponse.json(error.message);
    }
}
