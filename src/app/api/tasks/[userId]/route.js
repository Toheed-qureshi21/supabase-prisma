import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prismaClient";


export const GET = async (req, { params }) => {
  try {
    const { userId } = params;

    const todos = await prisma.todo.findMany({
      where: { user_id: userId },
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json({ data: todos }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
