import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prismaClient";

export const PATCH = async (req, { params }) => {
  try {
    const { id } = params;
    const numericId = parseInt(id);

    const updatedTodo = await prisma.todo.update({
      where: { id: numericId },
      data: {
        isCompleted: false,
      },
    });

    console.log("mark as incomplete", updatedTodo);

    return NextResponse.json(
      { data: updatedTodo, message: "Marked as pending successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
