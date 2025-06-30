import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prismaClient";

export const GET = async (req,{params}) => {
  try {
    const {userId} = await params;
    console.log("user id in get user profile",userId);
    

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        user_name: true,
        created_at: true,
        // add other fields if needed
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });

  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
