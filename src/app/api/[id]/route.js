import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prismaClient";
import { serializeBigInt } from "@/utils/serializeBigInt";


// import { prisma } from "@/prisma/prismaClient";

export const PUT = async (req, { params }) => {
  try {
    const { title, description } = await req.json();
    const { id } = await params;
    const numericId = parseInt(id);

    const updatedTodo = await prisma.todo.update({
      where: { id: numericId },
      data: {
        title,
        description,
        isUpdated: true,
        updated_at: new Date(),
      },
    });
    const serializedTodos = serializeBigInt(updatedTodo);

    return NextResponse.json({ message: "Edited successfully", data: serializedTodos}, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};


export const DELETE = async (req, { params }) => {
  try {
    const { id } = await params;
    const numericId = BigInt(id);

    const deletedTodo = await prisma.todo.delete({
      where: { id: numericId },
    });
    const serializedTodos = serializeBigInt(deletedTodo);
    return NextResponse.json({ message: "Task deleted!", data: serializedTodos }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
