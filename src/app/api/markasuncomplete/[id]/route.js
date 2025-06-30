import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prismaClient";

export const PATCH = async (req, { params }) => {
  try {
    const { id } = await params;
    const bigIntId = BigInt(id); // use BigInt if your DB id is BigInt

    const updatedTodo = await prisma.todo.update({
      where: { id: bigIntId },
      data: {
        isCompleted: false,
      },
    });

    console.log("mark as incomplete", updatedTodo);

    const safeTodo = JSON.parse(
      JSON.stringify(updatedTodo, (_, v) => (typeof v === 'bigint' ? v.toString() : v))
    );

    return NextResponse.json(
      { data: safeTodo, message: "Marked as pending successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
