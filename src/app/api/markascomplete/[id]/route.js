import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prismaClient";

export const PATCH = async (req, { params }) => {
  try {
    const { id } = params;
   

    const updatedTodo = await prisma.todo.update({
      where: { id:id },
      data: {
        isCompleted: true,
      },
    });

    return NextResponse.json(
      { data: updatedTodo, message: "Marked as completed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
