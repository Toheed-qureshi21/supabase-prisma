import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prismaClient";

export const PATCH = async (req, { params }) => {
  try {
    const { id } = await params;

    const updatedTodo = await prisma.todo.update({
      where: { id: id },
      data: {
        isCompleted: true,
      },
    });

    // Convert BigInt fields to strings before returning JSON
    const safeTodo = JSON.parse(
      JSON.stringify(updatedTodo, (_, v) => (typeof v === "bigint" ? v.toString() : v))
    );
    console.log("completed todo:", safeTodo);
    
    return NextResponse.json(
      { data: safeTodo, message: "Marked as completed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
